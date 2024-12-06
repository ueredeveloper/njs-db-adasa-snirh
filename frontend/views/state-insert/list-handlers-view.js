
import desktopDbSearchByParams from "../../services/desktop-db-search-by-params-1.js";
import snirhInsert from "../../services/snirh-insert.js";
import { convertValuesToString } from "../../utils/index.js";
import StateInsertView from "../state-insert-view.js";

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

const ListHandlersView = {
    init: function () {
        this.div = $('#state-insert-lista-handlers');

        this.render();

        $('#btn-state-insert-all').on('click', async function () {
            // Captura a busca de outorgas no banco de dadso local da Adasa
            let stateGrants = StateInsertView.getStateGrants();

            for (let stateGrant of stateGrants) {

                let params = {
                    OUT_NU_PROCESSO: stateGrant.EMP_NM_USUARIO,
                    OUT_NU_ATO: stateGrant.OUT_NU_ATO,
                    EMP_NU_CPFCNPJ: stateGrant.EMP_NU_CPFCNPJ,
                    EMP_NM_USUARIO: stateGrant.EMP_NM_USUARIO,
                    INT_CD_ORIGEM: stateGrant.INT_CD_ORIGEM
                }
                console.log('front search by params')

                let results = await desktopDbSearchByParams(params);

                // Não encontrou a outorga no desktop db
                if (results.length === 0) {

                    // Inserção da Outorga no SNIRH

                    let toInsert = [{
                        // Antes converte valores para string; Ex: INT_TIN_CD: 1 => INT_TIN_CD: '1'
                        stateGrant: convertValuesToString(stateGrant),
        
                    }];

                    // Sempre adicione uma array, ex: [stateGrant]
                    let response = await snirhInsert('DF', toInsert);

                    if (response.sucesso === true) {
                        alert(response.mensagem)
                    } else {

                        let params = {
                            uf: 'DF',
                            idArquivoErro: response.idArquivoErro
                        }
                        await snirhError(params).then(errorResponse => {

                            console.log(errorResponse)
                            alert('Erro: ' + errorResponse)
                        });
                    }

                }

                results.forEach(result => console.log("SIM", params.INT_CD_ORIGEM, '===> ', result.INT_CD_ORIGEM, result.EMP_NM_RESPONSAVEL))


            }

        });

    },
    render() {
        this.div.append(`
        <div class="flex item-center py-1">
            <input type="checkbox" id="toggle-columns">
            <label for="toggle-columns"> Alternar colunas </label>
            <!-- Editar vários objetos após seleção-->
            <button id="btn-state-insert-all" class="hover:bg-sky-600 active:bg-sky-700 focus:outline-none focus:ring focus:ring-sky-300 mx-10"> 
    
                <svg class="h-6 w-6" viewBox="39.098 35.362 338.279 336.978" width="338.279" height="336.978" xmlns="http://www.w3.org/2000/svg">
                <path d="M 357.974 285.362 C 357.974 322.658 327.549 352.966 290.109 352.966 L 126.411 352.966 C 88.973 352.966 58.546 322.658 58.546 285.362 L 58.546 122.34 C 58.546 85.044 88.973 54.736 126.411 54.736 L 185.532 54.736 L 185.532 35.362 L 126.411 35.362 C 78.268 35.362 39.098 74.382 39.098 122.34 L 39.098 285.362 C 39.098 333.32 78.268 372.34 126.411 372.34 L 290.062 372.34 C 338.206 372.34 377.377 333.32 377.377 285.362 L 377.377 226.469 L 357.927 226.469 L 357.927 285.362 L 357.974 285.362 Z" style=""/>
                <g id="SVGRepo_bgCarrier" stroke-width="0" transform="matrix(5.944760322570801, 0, 0, 5.56330680847168, 232.1440887451172, 151.79879760742188)" style=""/>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" transform="matrix(5.944760322570801, 0, 0, 5.56330680847168, 232.1440887451172, 151.79879760742188)" style=""/>
                <g id="SVGRepo_iconCarrier" transform="matrix(5.944760322570801, 0, 0, 5.56330680847168, 66.14143371582031, 53.525226593017585)" style="">
                    <g>
                    <g id="Layer_1_3_">
                        <path d="M47,14.955V2.136C47,0.956,46.043,0,44.863,0H32.046c-1.181,0-2.137,0.957-2.137,2.136v5.341 c-10.436,0-19.204,7.173-21.698,16.841L5.99,23.927c-0.399-0.069-0.803,0.091-1.044,0.416c-0.24,0.325-0.278,0.759-0.095,1.12 l2.314,4.569C3.109,30.693,0,34.213,0,38.455C0,43.167,3.834,47,8.546,47c4.35,0,7.942-3.27,8.471-7.477h7.551v2.136 c0,0.405,0.229,0.774,0.591,0.956c0.362,0.18,0.795,0.142,1.12-0.102l3.734-2.802c0.61,4.116,4.158,7.288,8.44,7.288 C43.166,47,47,43.167,47,38.455c0-4.35-3.27-7.943-7.479-8.471v-7.552h2.138c0.403,0,0.774-0.229,0.954-0.59 c0.182-0.361,0.144-0.795-0.1-1.119l-2.725-3.631h5.072C46.043,17.091,47,16.134,47,14.955z M8.546,42.727 c-2.356,0-4.273-1.916-4.273-4.271s1.917-4.273,4.273-4.273s4.272,1.918,4.272,4.273S10.902,42.727,8.546,42.727z M42.729,38.455 c0,2.355-1.918,4.271-4.273,4.271s-4.271-1.916-4.271-4.271s1.916-4.273,4.271-4.273S42.729,36.1,42.729,38.455z M34.295,21.841 c0.182,0.362,0.551,0.59,0.955,0.59h2.137v7.551c-3.794,0.478-6.814,3.447-7.373,7.215l-3.736-2.803 c-0.323-0.242-0.756-0.28-1.118-0.101c-0.361,0.183-0.591,0.551-0.591,0.956v2.136h-7.551c-0.484-3.862-3.553-6.927-7.418-7.405 c0.003-0.024,0.015-0.045,0.015-0.071c0-0.005,0-0.007,0-0.011l3.233-3.027c0.295-0.276,0.408-0.696,0.294-1.084 c-0.117-0.389-0.44-0.678-0.839-0.748l-1.983-0.35C12.632,16.024,20.526,9.613,29.91,9.613v5.341c0,1.18,0.956,2.136,2.137,2.136 h5.073l-2.724,3.632C34.152,21.046,34.113,21.479,34.295,21.841z M42.729,12.818h-8.547V4.273h8.547V12.818z"/>
                    </g>
                    </g>
                </g>
                </svg>
            </button>
           
        </div>
        `)
    }
}

export default ListHandlersView;
