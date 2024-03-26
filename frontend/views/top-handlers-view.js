import TopHandlersSimpleSearch from "./top-handlers-simple-search";
import TopHandlersSnirhSearch from "./top-handlers-snirh-search";

const TopHandlersView = {
    init: function () {

        this.div = $('#top-handlers')
        this.render();

        $('#btnSearch').on('click', function () {

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

    },
    render: function () {


        this.div.append(
            `
            <form class="flex flex-1 flex-row m-2">

            <!-- Busca Simples -->
            <div class="flex-1 h-20 " id="simpleSearch">
            ${TopHandlersSimpleSearch()}
            </div>
        
            <!-- Busca SNIRH -->
            <div class="flex-1 h-20 bg-gray-100 hidden" id="snirhSearch">
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
                class="h-20 p-2 bg-gray-200 cursor-pointer rouded-lg hover:bg-violet-600 active:bg-violet-700" />
            </div>
          </form>
        
            `

        )
    }
}

export default TopHandlersView;