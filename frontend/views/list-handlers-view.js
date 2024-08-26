import StateGrantsModel from "../models/state-grants-model";
import snirhError from "../services/snirh-error";
import snirhUpdate from "../services/snirh-update";
import toUpdateGrants from "../shared/to-update-grants";
import { getInterferenceType } from "../utils";
import { filterColumns } from "../utils/filter-columns";
import FederalView from "./federal-view";

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

        $('#btn-update').on('click', async function () {
            let toUpdate = toUpdateGrants.getToUpdateGrants();

            let response = await snirhUpdate('DF', toUpdate);

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
        });
        $('#btn-auto-update').on('click', async function () {
            let federalGrants = FederalView.getFederalGrants();

            //for (let federalGrant of federalGrants.slice(ListHandlersView.indexForTest, ++ListHandlersView.indexForTest)) {
            for (let federalGrant of federalGrants) {

                let { INT_NU_LATITUDE: latitude, INT_NU_LONGITUDE: longitude, INT_TIN_CD, INT_TSU_CD } = federalGrant;
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

                            // Trasnformar todos atributos para string. É necessário para a aceitação do SNIRH.
                            for (let key in stateGrant) {
                                stateGrant[key] = String(stateGrant[key]);
                            }
                            // Trasnformar todos atributos para string. É necessário para a aceitação do SNIRH.
                            for (let key in federalGrant) {
                                federalGrant[key] = String(federalGrant[key]);
                            }

                            let toUpdate = [{
                                stateGrant: stateGrant,
                                federalGrant: federalGrant
                            }];

                            console.log(toUpdate[0].stateGrant, toUpdate[0].federalGrant.INT_CD)

                            let response = await snirhUpdate('DF', toUpdate);

                            if (response && response.sucesso) {
                                console.log(response.mensagem);
                            } else {
                                let params = {
                                    uf: 'DF',
                                    idArquivoErro: response.idArquivoErro
                                };
                                let errorResponse = await snirhError(params);
                                console.log('Erro: ' + errorResponse);
                            }
                        } else {
                            console.log('ERROR', stateGrant.INT_CD_ORIGEM, federalGrant);
                        }
                    } else {
                        console.log('Nenhum ponto estadual encontrado próximo a: ', federalGrant);
                    }
                } catch (error) {
                    console.error('Erro durante a execução:', error);
                }
            }
        });

        // Limpa dados para nova edição.
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
        <div>
            <input type="checkbox" id="toggle-columns">
            <label for="toggle-columns"> Alternar colunas </label>
            <!-- Editar vários objetos após seleção-->
            <button id="btn-update" class="hover:bg-sky-600 active:bg-sky-700 focus:outline-none focus:ring focus:ring-sky-300 mx-10"> Editar Vários </button>
            <!-- Edita vários objetos buscando por proximidade-->
            <button id="btn-auto-update" class="hover:bg-sky-600 active:bg-sky-700 focus:outline-none focus:ring focus:ring-sky-300 mx-10"> Editar Vários Automaticamente </button>
            <button id="btn-clear" class="hover:bg-sky-600 active:bg-sky-700 focus:outline-none focus:ring focus:ring-sky-300 mx-10"> Limpar </button>
     
            </div>
            `)
    }
}

export default ListHandlersView;