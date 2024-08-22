import snirhError from "../services/snirh-error";
import snirhUpdate from "../services/snirh-update";
import toUpdateGrants from "../shared/to-update-grants";
import { filterColumns } from "../utils/filter-columns";

const ListHandlersView = {
    init: function () {
        this.div = $('#list-handlers');

        this.tables = [
            { class: 'federal-list', id: 'federal-list-sub', tipo: '1', subtipo: '2' },
            { class: 'federal-list hidden', id: 'federal-list-sup', tipo: '1', subtipo: '1' },
            { class: 'federal-list hidden', id: 'federal-list-lan', tipo: '2', subtipo: '1' },
            { class: 'federal-list hidden', id: 'federal-list-bar', tipo: '3', subtipo: '1' }
        ];

        this.render();

        $('#toggle-columns').change(function (e) {

            var isChecked = $(this).is(":checked");

            filterColumns(ListHandlersView, $(this));

        })

        $('#btn-save').on('click', async function () {
            let toUpdate = toUpdateGrants.getToUpdateGrants();

            console.log(toUpdate.length, toUpdate)

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
            <button id="btn-save" class="hover:bg-sky-600 active:bg-sky-700 focus:outline-none focus:ring focus:ring-sky-300 mx-10"> Salvar </button>
            <button id="btn-clear" class="hover:bg-sky-600 active:bg-sky-700 focus:outline-none focus:ring focus:ring-sky-300 mx-10"> Limpar </button>
     
            </div>
            `)
    }
}

export default ListHandlersView;