
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

const { readSnirhFile } = require("../utils/read-write-and-verify-file");
const { selectByParam, selectClosestPoints } = require('../services');

const getInterferenceType = (INT_TIN_CD, INT_TSU_CD) => {

    /* 
    this.tables = [
            { class: 'list-snirh', id: 'list-snirh-sub', tipo: '1', subtipo: '2' },
            { class: 'list-snirh hidden', id: 'list-snirh-sup', tipo: '1', subtipo: '1' },
            { class: 'list-snirh hidden', id: 'list-snirh-lan', tipo: '2', subtipo: '1' },
            { class: 'list-snirh hidden', id: 'list-snirh-bar', tipo: '3', subtipo: '1' }
        ];
        */

    /*
     Tabela tipo interferência
        1 - Superficial;
        2 - Subterrânea
        3 - Lançamento de Águas Pluviais
        4 - Lançamento de Efluentes
        5 - Barragem
        6 - Caminhão Pipa
        
        */

    switch ([INT_TIN_CD, INT_TSU_CD].join('')) {
        case "11":
            return 1; // Interferência do tipo 1 (Superficial)
        case "12":
            return 2; // Interferência do tipo 2 (Subterrânea)
        case "21":
            return 3; // Interferência do tipo 3 (Lançamento)
        case "31":
            return 5; // Interferência do tipo 5 (Barragem)
        default:
            return null; // Outro tipo de interferência
    }
}

function isSamePoint(distance, threshold) {
    return distance <= threshold;
}

function normalizeCoordinate(coord) {
    if (!coord) return null;
    return coord.replace("#", "").replace(",", ".");
}

async function fetchClosestPoints(INT_NU_LATITUDE, INT_NU_LONGITUDE, ID_TIPO_INTERFERENCIA) {
    try {
        const response = await fetch(`http://localhost:3000/services/select-closest-points?latitude=${normalizeCoordinate(INT_NU_LATITUDE)}&longitude=${normalizeCoordinate(INT_NU_LONGITUDE)}&ti=${ID_TIPO_INTERFERENCIA}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        return data;

    } catch (err) {
        console.error("Fetch failed:", err);
    }
}

function generateErrorMessage(message, federalGrant, stateGrant) {
    return {
        'message': message,
        'SNIRH': federalGrant.INT_CD,
        'ADASA': stateGrant.INT_CD_ORIGEM,
        'Nome': stateGrant.EMP_NM_RESPONSAVEL,
        'Endereço': stateGrant.EMP_NM_EMPREENDIMENTO,
        'CPF/CNPJ': stateGrant.EMP_NU_CPFCNPJ,
        'Processo': stateGrant.OUT_NU_PROCESSO
    };
}

async function fetchSNIRHUpdate(updateSnirhFiles) {
    try {
        const response = await fetch(`http://localhost:3000/services/update?uf=DF`,
            {
                method: 'POST',
                body: JSON.stringify(updateSnirhFiles),
                headers: { 'Content-Type': 'application/json' }
            }

        );
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        return data;

    } catch (err) {
        console.error("Fetch failed:", err);
    }
}

async function fetchPointByTypeAndId(ti, id) {
    try {
        const response = await fetch(`http://localhost:3000/services/select-point-by-type-and-id?ti=${ti}&id=${id}`,
            {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }

        );
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        return data;

    } catch (err) {
        console.error("Fetch failed:", err);
    }
}

const snirhError = async (params) => {
    let { uf, idArquivoErro } = params;

    // Constructing the URL with parameters
    let url = new URL('http://localhost:3000/services//snirh-process-error?');
    url.searchParams.append('uf', uf);
    url.searchParams.append('idArquivoErro', idArquivoErro);

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
            }
        });

        return response.text();

    } catch (error) {
        console.error('Error:', error);
    }
}
/**
 * Como usar: node ./backend/utils/update-snirh-files.js
 */
const updateSnirhFiles = async () => {

    const desktopDb = await new Promise((resolve, reject) => {
        readSnirhFile((err, data) => {
            if (err) return reject(err);
            resolve(data);
        });
    });

    // Limite de dados do banco capturados para edição
    let lenDB = 1000;
    // Quando atingir tantos registros, enviar para o SNIRH
    let lenToEdit = 10;
    const items = desktopDb.slice(200, lenDB);

    let toUpdateGrants = [];

    let errors = []

    for (const federalGrant of items) {

        let { INT_NU_LATITUDE, INT_NU_LONGITUDE, INT_TIN_CD, INT_TSU_CD, INT_CD_ORIGEM, INT_CD, OUT_NU_PROCESSO } = federalGrant;
        let ID_TIPO_INTERFERENCIA = getInterferenceType(INT_TIN_CD, INT_TSU_CD);

        let stateGrant;

        // Se não tem relacionamento com outorga na Adasa, procurar pela distância entre pontos
        if (INT_CD_ORIGEM === "") {

            // console.log(`Edição por ponto próximo: ${INT_NU_LATITUDE}), ${INT_NU_LONGITUDE}, ti: ${ID_TIPO_INTERFERENCIA}`);

            const stateGrants = await fetchClosestPoints(INT_NU_LATITUDE, INT_NU_LONGITUDE, ID_TIPO_INTERFERENCIA);

            if (stateGrants && stateGrants?.length > 0) {

                stateGrant = stateGrants[0];
                const limite = 1e-6;

                if (stateGrant.DISTANCE && isSamePoint(stateGrant.DISTANCE, limite)) {
                    delete stateGrant.DISTANCE;

                    // Transformar todos atributos para string. É necessário para a aceitação do SNIRH.
                    for (let key in stateGrant) {
                        stateGrant[key] = String(stateGrant[key]);
                    }
                    for (let key in federalGrant) {
                        federalGrant[key] = String(federalGrant[key]);
                    }

                    let toUpdate = {
                        stateGrant: stateGrant,
                        federalGrant: federalGrant
                    };

                   

                    toUpdateGrants.push(toUpdate);

                }

            }

            // Se houver relacionamento, procurar pelo id da outorga na Adasa
        } else {

            console.log('buscar pelo tipo de interferencia ', ID_TIPO_INTERFERENCIA)

            const stateGrants = await fetchPointByTypeAndId(ID_TIPO_INTERFERENCIA, INT_CD_ORIGEM);

            // console.log(`Edição por relacionamento: , ti: , ${ID_TIPO_INTERFERENCIA}, Id Adasa: , ${INT_CD_ORIGEM}`)

            if (stateGrants && stateGrants?.length > 0) {
                stateGrant = stateGrants[0];

                // Transformar todos atributos para string. É necessário para a aceitação do SNIRH.
                for (let key in stateGrant) {
                    stateGrant[key] = String(stateGrant[key]);
                }
                for (let key in federalGrant) {
                    federalGrant[key] = String(federalGrant[key]);
                }
                let toUpdate = {
                    stateGrant: stateGrant,
                    federalGrant: federalGrant
                };
                toUpdateGrants.push(toUpdate);
            }

        }

        // Quando atingir tantos registros, enviar para o SNIRH
        if (toUpdateGrants?.length === lenToEdit) {

            let response = await fetchSNIRHUpdate(toUpdateGrants)

            if (response && response.sucesso) {
                console.log(response.mensagem);
            } else {

                let params = {
                    uf: 'DF',
                    idArquivoErro: response?.idArquivoErro
                };

                let errorResponse = await snirhError(params);

                console.log('errorResponse: ', errorResponse,
                    'snirh id: ', INT_CD, 'adasa id: ',
                    stateGrant.INT_CD_ORIGEM, 'processo: ',
                    stateGrant.OUT_NU_PROCESSO, 'cpf: ', stateGrant.EMP_NU_CPFCNPJ);

                    errors.push({processo: stateGrant.OUT_NU_PROCESSO, cpf: stateGrant.EMP_NU_CPFCNPJ})

                if (response?.mensagem) {
                    console.log('mensagem ', response.mensagem);
                }

                // console.log(generateErrorMessage('Erro: ' + errorResponse, federalGrant, stateGrant));
            }

            //console.log(`Enviando ${toUpdateGrants?.length} atualizações para o SNIRH...`);
            toUpdateGrants = [];
        }

        

    } // fim loop

    console.log('errors ', errors)

}

updateSnirhFiles();

