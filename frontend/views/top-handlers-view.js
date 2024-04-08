import SNIRHGrantsModel from "../models/snirh/snirh-grants-model";
import exportCsv from "../services/export-csv";
import ListSnirhView from "./snirh/list-snirh-view";
import TopHandlersSimpleSearch from "./top-handlers-simple-search";
import TopHandlersSnirhSearch from "./top-handlers-snirh-search";


const TopHandlersView = {
    init: function () {

        this.div = $('#top-handlers');
        this.searchParams = {
            "uf": "DF",
            "dataInicio": "20180101000000",
            "dataFim": "20230101000000",
            "idDominialidade": "1",
            "idTipoOutorga": "1",
            "idSituacaoOutorga": "1",
            "idFinalidade": "5",
            "pagina": 1,
            "tamanhoPagina": 30
        }
        this.render();

        // Add click event listener to the button
        $('#btnSearch').on('click', async () => {
            try {
                // Atualiza os valores após buscar no serviço e envia para `ListSnirhView`.
                let { data } = await exportCsv(TopHandlersView.searchParams);
                // Remove o último ítem, no servidor, ao converter csv para json, o último resultado vem vazio.
                data.pop();
    
                $(document).trigger("updateSnirhTables", [data]);

            } catch (error) {
                console.error(error);
            }
        });

        $('#checkTypeSearch').change(function (e) {

            let isChecked = $(this).is(":checked");

            if (isChecked) {

                $('#simpleSearch').hide();
                $('#snirhSearch').show();

            } else {
                $('#simpleSearch').show();
                $('#snirhSearch').hide();
            }

        })

        $(document).on('searchSnirhChanged', (event, params) => {
            this.searchParams = params;
        });

    },
    render: function () {


        this.div.append(
            `
            <div class="flex flex-1 flex-row m-2">

            <!-- Busca Simples -->
            <div class="flex-1 h-30 my-10" id="simpleSearch">
            ${TopHandlersSimpleSearch()}
            </div>
        
            <!-- Busca SNIRH -->
            <div class="flex-1 h-30 my-2 bg-gray-100 hidden" id="snirhSearch">
            ${TopHandlersSnirhSearch()}
            </div>
        
            <div class="flex flex-row">
              <div class="flex  flex-1 p-2">
                <label class="self-center px-2">CNARH</label>
                <input type="checkbox" class="px-2" id="checkTypeSearch" />
              </div>
        
              <button 
                id="btnSearch" 
                class="h-full p-4 bg-gray-200 cursor-pointer rounded-lg hover:bg-violet-600 active:bg-violet-700">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>

                </button>
            </div>
          </div>
        
            `

        )
    }
}

export default TopHandlersView;