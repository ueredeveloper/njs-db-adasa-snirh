
import exportCsv from "../services/export-csv";
import selectByDesktopDb from "../services/select-by-desktop-db";
import { snirhParams } from "../utils";
import FederalSimpleSearchView from "./federal-simple-search-view";
import FederalSnirhSearchView from "./federal-snirh-search-view";

const TopHandlersView = {
    init: function () {

        this.div = $('#top-handlers');
        this.params = snirhParams;
        this.render();

        // Add click event listener to the button
        $('#btn-search').on('click', async () => {

            // Verifica se a busca é simples ou pelo SNIRH.
            let isChecked = $('#checkTypeSearch').is(":checked");

            console.log(this.params)

            if (isChecked) {

                try {
                    // Atualiza os valores após buscar no serviço e envia para `ListSnirhView`.
                    let { data } = await exportCsv(TopHandlersView.params);
                    // Remove o último ítem, no servidor, ao converter csv para json, o último resultado vem vazio.
                    data.pop();

                    $(document).trigger("updateSnirhTables", [data]);

                } catch (error) {
                    console.error('snirh search by snirh service ', error);
                }

            } else {

                try {

                    let search = $('#inputSearch').val();

                    if (search.length === 0) {
                        alert('Digite algo que possa ser pesquisado!!! ')
                    } else {

                        let data = await selectByDesktopDb(search);
                        $(document).trigger("updateSnirhTables", [data]);
                    }

                } catch (error) {
                    console.log('simple search by desktopdb,  error: ', error)
                }

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
            this.params = params;
        });

    },
    render: function () {

        this.div.append(
            `
            <div class="flex flex-1 flex-row m-2">

            <!-- Busca Simples -->
            <div class="flex-1 h-30 my-10" id="simpleSearch">
            ${FederalSimpleSearchView()}
            </div>
        
            <!-- Busca SNIRH -->
            <div class="flex-1 h-30 my-2 bg-gray-100 hidden" id="snirhSearch">
            ${FederalSnirhSearchView()}
            </div>
        
            <div class="flex flex-row">
              <div class="flex  flex-1 p-2">
                <label class="self-center px-2">CNARH</label>
                <input type="checkbox" class="px-2" id="checkTypeSearch" />
              </div>
        
              <button 
                id="btn-search" 
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