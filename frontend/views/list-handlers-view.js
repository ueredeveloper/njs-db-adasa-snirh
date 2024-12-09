import StateGrantsModel from "../models/state-grants-model";
import snirhError from "../services/snirh-error";
import snirhUpdate from "../services/snirh-update";
import toUpdateGrants from "../shared/to-update-grants";
import { getInterferenceType } from "../utils";
import { filterColumns } from "../utils/filter-columns";
import FederalView from "./federal-view";

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
        this.div = $('#list-handlers');

        this.tables = [
            { class: 'federal-list', id: 'federal-list-sub', tipo: '1', subtipo: '2' },
            { class: 'federal-list hidden', id: 'federal-list-sup', tipo: '1', subtipo: '1' },
            { class: 'federal-list hidden', id: 'federal-list-lan', tipo: '2', subtipo: '1' },
            { class: 'federal-list hidden', id: 'federal-list-bar', tipo: '3', subtipo: '1' }
        ];
        this.indexForTest = 12;

        this.render();

        $('#toggle-columns').change(function (e) {
            var isChecked = $(this).is(":checked");
            filterColumns(ListHandlersView, $(this));
        })

        $('#btn-update-by-relation').on('click', async function () {
            // Lista de outorgas federais
            let federalGrants = FederalView.getFederalGrants();

            
            console.log(federalGrants)

            

           /* let response = await snirhUpdate('DF', toUpdate);

            if (response.sucesso === true) {
                console.log(response.mensagem)
            } else {
                let params = {
                    uf: 'DF',
                    idArquivoErro: response.idArquivoErro
                }
                await snirhError(params).then(errorResponse => {
                    console.log(generateErrorMessage('Erro: ' + errorResponse, toUpdate.federalGrant, toUpdate.stateGrant));
                    alert('Erro: ' + errorResponse)
                });
            }*/
        });

        // Salva os errors de cpf e cnpj em uma variável sem que haja repetição de dados
        let cpfcnpjResultsError = new Set();

        $('#btn-update-by-position').on('click', async function () {

            // Lista de outorgas federais
            let federalGrants = FederalView.getFederalGrants();

            for (let federalGrant of federalGrants) {

                // Não fazer atualização por posição próxima se a outorga federal estiver preenchida com o id de origem na outorga estadual (INT_CD_ORIGEM)
                //Se não estiver preenchida, ou seja, string vazia '', editar
                if (federalGrant.INT_CD_ORIGEM === '') {
                    // for (let federalGrant of federalGrants.slice(ListHandlersView.indexForTest, ++ListHandlersView.indexForTest)) {

                    let { INT_NU_LATITUDE: latitude, INT_NU_LONGITUDE: longitude, INT_TIN_CD, INT_TSU_CD } = federalGrant;

                    // Captura tipo de interferência
                    let ti = getInterferenceType(INT_TIN_CD, INT_TSU_CD);

                    try {
                        let stateGrants = await StateGrantsModel.selectClosestPoints(latitude.replace("#", ""), longitude.replace("#", ""), ti);

                        if (stateGrants && stateGrants.length > 0) {
                            function isSamePoint(distance, threshold) {
                                return distance <= threshold;
                            }

                            let stateGrant = stateGrants[0];

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

                                let toUpdate = [{
                                    stateGrant: stateGrant,
                                    federalGrant: federalGrant
                                }];

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
                            } else {
                                // console.log(generateErrorMessage('ERRO: Sem ponto de outorga próximo:', federalGrant, stateGrant));
                            }
                        } else {
                            //console.log(generateErrorMessage('Array de outorgas estaduais e federais com tamanho inválido:', federalGrant, stateGrant));
                        }
                    } catch (error) {
                        console.error('Erro durante a execução:', error);
                    }


                } else {
                    //  console.log(`Outorga federal, id ${federalGrant.INT_CD}, relacionada outorga estadual, id ${federalGrant.INT_CD_ORIGEM}`);
                }
            }

            console.log("Atualizações realizadas!!!")
        });

        $('#btn-clear').on('click', async function () {
            toUpdateGrants.setToUpdateGrants([]);
            alert('Dados limpos com sucesso!!!')
        });

        $(document).on("getListHandlerViewCheckBox", async (event, data) => {
            return $('#toggle-columns');
        });

    },
    render() {
        this.div.append(`
        <div class="flex item-center py-1">
            <input type="checkbox" id="toggle-columns">
            <label for="toggle-columns"> Alternar colunas </label>
            <!-- Editar vários objetos após seleção-->
            <button id="btn-update-by-relation" class="hover:bg-sky-600 active:bg-sky-700 focus:outline-none focus:ring focus:ring-sky-300 mx-10"> 
    
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
            <!-- Edita vários objetos buscando por proximidade-->
            <button id="btn-update-by-position" class=" hover:bg-sky-600 active:bg-sky-700 focus:outline-none focus:ring focus:ring-sky-300 mx-10">
               
                <svg class="h-6 w-6" viewBox="57.128 30.183 338.803 336.978" width="338.803" height="336.978" xmlns="http://www.w3.org/2000/svg">
                <path d="M 373.262 180.627 C 367.931 236.933 321.575 281.558 263.037 286.735 L 263.037 308.538 L 240.883 308.538 L 240.883 286.7 C 182.344 281.523 135.989 236.898 130.658 180.592 L 107.97 180.592 L 107.97 159.303 L 130.684 159.303 C 136.235 103.181 182.516 58.799 240.883 53.623 L 240.883 31.802 L 263.037 31.802 L 263.037 53.623 C 321.403 58.801 367.685 103.181 373.244 159.303 L 395.931 159.303 L 395.931 180.592 L 373.262 180.592 L 373.262 180.627 Z M 350.921 159.337 C 345.585 114.993 309.156 80.047 263.037 75.032 L 263.037 95.698 L 240.883 95.698 L 240.883 75.032 C 194.763 80.047 158.334 114.993 152.998 159.337 L 174.422 159.337 L 174.422 180.627 L 152.935 180.627 C 158.089 225.152 194.597 260.318 240.883 265.342 L 240.883 244.694 L 263.037 244.694 L 263.037 265.342 C 309.323 260.315 345.832 225.152 350.993 180.627 L 329.479 180.627 L 329.479 159.337 L 350.921 159.337 Z M 251.951 201.908 C 226.397 201.888 210.449 175.271 223.243 153.996 C 236.038 132.722 267.98 132.747 280.739 154.041 C 283.643 158.888 285.172 164.387 285.172 169.982 C 285.158 187.618 270.288 201.908 251.951 201.908 Z" style="" transform="matrix(1, 0, 0, 1, 0, 2.842170943040401e-14)"/>
                <path d="M 376.004 280.183 C 376.004 317.479 345.579 347.787 308.139 347.787 L 144.441 347.787 C 107.003 347.787 76.576 317.479 76.576 280.183 L 76.576 117.161 C 76.576 79.865 107.003 49.557 144.441 49.557 L 203.562 49.557 L 203.562 30.183 L 144.441 30.183 C 96.298 30.183 57.128 69.203 57.128 117.161 L 57.128 280.183 C 57.128 328.141 96.298 367.161 144.441 367.161 L 308.092 367.161 C 356.236 367.161 395.407 328.141 395.407 280.183 L 395.407 221.29 L 375.957 221.29 L 375.957 280.183 L 376.004 280.183 Z" style="" transform="matrix(1, 0, 0, 1, 0, 2.842170943040401e-14)"/>
                </svg>
            </button>
            <button id="btn-clear" class="hover:bg-sky-600 active:bg-sky-700 focus:outline-none focus:ring focus:ring-sky-300 mx-10">
                
                <svg class="h-6 w-6" fill="#000000" viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M 13.7851 49.5742 L 42.2382 49.5742 C 47.1366 49.5742 49.5743 47.1367 49.5743 42.3086 L 49.5743 13.6914 C 49.5743 8.8633 47.1366 6.4258 42.2382 6.4258 L 13.7851 6.4258 C 8.9101 6.4258 6.4257 8.8398 6.4257 13.6914 L 6.4257 42.3086 C 6.4257 47.1602 8.9101 49.5742 13.7851 49.5742 Z M 13.8554 45.8008 C 11.5117 45.8008 10.1992 44.5586 10.1992 42.1211 L 10.1992 13.8789 C 10.1992 11.4414 11.5117 10.1992 13.8554 10.1992 L 42.1679 10.1992 C 44.4882 10.1992 45.8007 11.4414 45.8007 13.8789 L 45.8007 42.1211 C 45.8007 44.5586 44.4882 45.8008 42.1679 45.8008 Z M 18.1913 35.9336 C 18.1913 36.9649 19.0117 37.8086 20.0429 37.8086 C 20.5585 37.8086 21.0273 37.6211 21.3554 37.2696 L 27.9882 30.6133 L 34.6444 37.2696 C 34.9726 37.5977 35.4179 37.8086 35.9335 37.8086 C 36.9648 37.8086 37.8085 36.9649 37.8085 35.9336 C 37.8085 35.3945 37.5976 34.9727 37.2460 34.6211 L 30.6366 27.9883 L 37.2695 21.3320 C 37.6444 20.9571 37.8320 20.5352 37.8320 20.0430 C 37.8320 19.0118 37.0117 18.1680 35.9570 18.1680 C 35.4882 18.1680 35.0898 18.3555 34.7148 18.7305 L 27.9882 25.4102 L 21.3085 18.7539 C 20.9570 18.4258 20.5585 18.2149 20.0429 18.2149 C 19.0351 18.2149 18.1913 19.0352 18.1913 20.0664 C 18.1913 20.5586 18.4023 21.0039 18.7304 21.3555 L 25.3632 27.9883 L 18.7304 34.6445 C 18.4023 34.9961 18.1913 35.4180 18.1913 35.9336 Z"></path></g></svg>     
            </button>
        </div>
        `)
    }
}

export default ListHandlersView;
