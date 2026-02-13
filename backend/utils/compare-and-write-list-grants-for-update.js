const exampleJsonBody = require('../services/shared/example-json-body');
const { isFloat, convertFloatToCommaString } = require('./convert-float-to-string');
const { convertJSONToCSV } = require('./convert-json-to-csv');
const { formatCpfCnpj } = require('./format-cpf-cnpj');
const { isDate, convertDateFormat } = require('./verify-and-convert-dates');

/**
 * Compara e formata uma lista de concessões, convertendo os valores de acordo com as regras do SNIRH,
 * e escreve o resultado em um arquivo CSV. O arquivo é nomeado utilizando o `currentTimestamp` para
 * garantir um registro único do arquivo editado.
 *
 * @param {Array} toUpdateGrants - Lista de concessões que serão atualizadas e formatadas.
 * @param {string} currentTimestamp - Timestamp utilizado para renomear o arquivo final.
 * @returns {Promise<string>} - Retorna o caminho do arquivo CSV gerado.
 */
const compareAndWriteListGrantsForUpdate = async (toUpdateGrants, currentTimestamp) => {

    return new Promise(async (resolve, reject) => {
        try {

            let toUpdateGrantsEdited = toUpdateGrants.map(item => {

                let { stateGrant, federalGrant } = item;

                let id = federalGrant.INT_CD || federalGrant.CNARH40;

                // Cria array para formatar valores de acordo com o SNIRH.
                let stateKeyValues = Object.entries(stateGrant);
                let objectToSend = stateGrant;

                stateKeyValues.forEach(([key, value]) => {
                    // Remove espaços no início e no final da string, let i = "   Olá, mundo!   " => "Olá Mundo!"
                    if (/^\s+$/.test(value)) {
                        value = "";
                    }

                    // Alguns valores vem como "null", mudar para ""
                    if (value === "null") {
                        value = "";
                    }

                    // Convert float para string
                    if (isFloat(value)) {
                        let str = convertFloatToCommaString(value);
                        objectToSend[key] = str;
                        // Adiciona caractere ao cpf: #
                    } else if (key === 'EMP_NU_CPFCNPJ') {
                        let cpfCnpj = '#' + formatCpfCnpj(value);
                        objectToSend[key] = cpfCnpj;

                        if (objectToSend[key].includes("##")) {
                            console.log("O número inclui dois ##, CPF/CNPJ: ", objectToSend[key], 
                                "Processo: ", objectToSend.OUT_NU_PROCESSO, 
                                "Nome: ", objectToSend.EMP_NM_RESPONSAVEL, "INT_CD: ", objectToSend.INT_CD);
                        }

                        //Converte data para formato dos SNIRH, 2015-01-02 => 02/01/2015    
                    } else if (isDate(value)) {
                        let dataConverted = convertDateFormat(value);
                        objectToSend[key] = dataConverted;
                        // Modifica demais objetos utilizando os dados do Estado.
                    } else {
                        objectToSend[key] = value;
                    }
                });

                // O valor INT_CD vem do SNRIH.
                objectToSend.INT_CD = id;

                // O valor FIN_CD vem do SNRIH. Só pode ser o valor FIN_CD
                objectToSend.FIN_CD = federalGrant.FIN_CD

                // 10/11/2025 - Não é possível modificar a finalidade principal
                objectToSend.FIN_TFN_CD = federalGrant.FIN_TFN_CD;

                // Este dado vem do SNIRH
                objectToSend.SIR_CD === '' ? objectToSend.SIR_CD = federalGrant.SIR_CD : null;

                
                // TIPO DE OUTRO USO. SOMENTE SE FIN_TFN_CD = 99. Em caso finalidade = 99, outros. Ex: piezômetro, OTO_CD = 15.
                objectToSend.OTO_CD = federalGrant.OTO_CD

                // Estes dados são no caso de id finalidade 5, irrigação
                //objectToSend.SIR_TSI_CD === '' ? objectToSend.SIR_TSI_CD = federalGrant.SIR_TSI_CD : null;
                //objectToSend.SIR_TCT_CD === '' ? objectToSend.SIR_TCT_CD = federalGrant.SIR_TCT_CD : null;
                //objectToSend.SIR_NU_AREAIRRIGADA === '' ? objectToSend.SIR_NU_AREAIRRIGADA = federalGrant.SIR_NU_AREAIRRIGADA : null;

                return objectToSend;

            });


            // Converte Json para Csv
            await convertJSONToCSV(toUpdateGrantsEdited, `./backend/data/csv/to-update-grants-${currentTimestamp}.csv`);
            // Caminho que será salvo o arquivo csv.
            resolve(`./backend/data/csv/to-update-grants-${currentTimestamp}.csv`);

        } catch (error) {
            reject(error);
        }
    });
};

module.exports = { compareAndWriteListGrantsForUpdate }
