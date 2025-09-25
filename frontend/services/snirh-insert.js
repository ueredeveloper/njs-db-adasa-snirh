


import desktopDbSearchDuplicatedIds from "./desktop-db-search-duplicateds-ids";
import desktopDBSearchPointById from "./desktop-db-search-point-by-id";
import localDBSelectPointByTypeAndId from "./local-db-select-point-by-type-and-id";
import snirhError from "./snirh-error";
import snirhUpdate from "./snirh-update";

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

const snirhInsert = async (uf, body) => {

    // Constructing the URL with parameters
    let url = new URL('http://localhost:3000/services/inserir');
    url.searchParams.append('uf', uf);

    // Antes de inserir, busca se o id da outorga na Adasa (INT_CD_ORIGEM), já 
    //foi cadastrado no CNIRH.
    //INT_TSU_CD => 1 SE SUPERFICIAL E 2 PARA SUBTERRÂNEA
    let { INT_TSU_CD, INT_CD_ORIGEM } = body[0].stateGrant

    // Verifica se já há relacionamento entre os INT_CD_ORIGEM (Adasa, Snirh)
    let snirhGrants = await desktopDBSearchPointById(INT_CD_ORIGEM);

    // Se não existir a outorga no CNARH (Desktop DB, backup do banco da Ana), insere.
    if (snirhGrants.length === 0) {

        // Verifica se há (INT_CD_ORIGEM) duplicados, se houver grava em cima deste (edita), ao invés de inserir novo
        let federalDuplicatedGrants = await desktopDbSearchDuplicatedIds();

        // Se houver duplicados, utiliza o primeiro resultado e depois deleta este resultado utilizado do banco (DesktopDB)
        if (federalDuplicatedGrants.length > 0) {
            // busca no banco o arquivo para edição no formato de edição, já que aqui se recebe o formato de inserção
            //querySelectSubterraneasForUpdate
            let stateGrantForEdit = await localDBSelectPointByTypeAndId(INT_TSU_CD, INT_CD_ORIGEM)

            console.log('Ponto para edição: ', stateGrantForEdit)

            // Captura o primeiro resultado, já que o retorno é um array
            let stateGrant = stateGrantForEdit[0];
            // Captura o primeiro resultado, já que o retorno é um array
            let federalGrant = federalDuplicatedGrants[1];

            // Transformar todos atributos para string. É necessário para a aceitação do SNIRH.
            for (let key in stateGrant) {
                stateGrant[key] = String(stateGrant[key]);
            }
            for (let key in federalGrant) {
                federalGrant[key] = String(federalGrant[key]);
            }

            // Cria objeto de edição para envio pelo serviço SNIRH

            let toUpdate = [{
                stateGrant: stateGrant,
                federalGrant: federalGrant
            }];

            console.log('Objeto para edição: ', toUpdate)

            let response = await snirhUpdate('DF', toUpdate);

            if (response && response.sucesso) {
                console.log(response.mensagem);
            } else {
                let params = {
                    uf: 'DF',
                    idArquivoErro: response.idArquivoErro
                };
                let errorResponse = await snirhError(params);

                cpfcnpjResultsError.add(generateErrorMessage('Erro: ' + errorResponse, federalGrant, stateGrant))
                console.log(cpfcnpjResultsError)
                // console.log(generateErrorMessage('Erro: ' + errorResponse, federalGrant, stateGrant));
            }

            //console.log(point)
            // edita o valor vindo do desktopdb (duplicatedIds[0]) com o valor da Adasa


        }





        /*try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body)
            });

            const data = await response.json();

            return data;

        } catch (error) {
            console.error('Error:', error);
        }*/

        return { sucesso: "ok" }

    } else {


        return { error: 'A outorga já foi cadastrada no SNIRH!' }
    }



}

export default snirhInsert;