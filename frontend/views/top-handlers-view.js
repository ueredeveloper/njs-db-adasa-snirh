import exportCsv from "../services/export-csv";
import TopHandlersSimpleSearch from "./top-handlers-simple-search";
import TopHandlersSnirhSearch from "./top-handlers-snirh-search";


const TopHandlersView = {
    init: function () {

        this.div = $('#top-handlers');
        this.searchParams = {
            uf: ''
        }
        this.render();

        $('#btnSearch').on('click', async function () {

            console.log (TopHandlersView.searchParams)

          let _exportCsv = await exportCsv(TopHandlersView.searchParams);

          console.log(_exportCsv)



        })
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

            console.log('this.search params ', this.searchParams)
        });



    },
    render: function () {


        this.div.append(
            `
            <div class="flex flex-1 flex-row m-2">

            <!-- Busca Simples -->
            <div class="flex-1 h-30 hidden" id="simpleSearch">
            ${TopHandlersSimpleSearch()}
            </div>
        
            <!-- Busca SNIRH -->
            <div class="flex-1 h-30 bg-gray-100" id="snirhSearch">
            ${TopHandlersSnirhSearch()}
            </div>
        
            <div class="flex flex-row">
              <div class="flex  flex-1 p-2">
                <label class="self-center px-2">CNARH</label>
                <input type="checkbox" class="px-2" id="checkTypeSearch" />
              </div>
        
              <input 
                type="button" value="Buscar" 
                id="btnSearch" 
                class="h-full p-2 bg-gray-200 cursor-pointer rouded-lg hover:bg-violet-600 active:bg-violet-700" />
            </div>
          </div>
        
            `

        )
    }
}

export default TopHandlersView;