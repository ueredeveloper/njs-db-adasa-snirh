
import localDbSelectByParams from "../services/local-db-select-by-params";
import StateSimpleSearch from "./state-simple-search-view";

const TopHandlersStateInsertView = {
    init: function () {

        this.div = $('#top-handlers-state-insert-view');
        this.render();

        // Add click event listener to the button
        $('#btn-state-simple-search').on('click', async () => {

            try {

                let param = $('#input-state-simple-search').val();

                if (param.length === 0) {
                    alert('Digite algo que possa ser pesquisado!!! ')
                } else {

                    //let data = await desktopDbSearchByParams(search);
                    let data = await localDbSelectByParams(param);
                    

                    $(document).trigger("updateStateInsertTables", [data]);
                }

            } catch (error) {
                console.log('simple search by desktopdb,  error: ', error)
            }

        });



    },
    render: function () {

        this.div.append(`
            <div class="flex flex-1 flex-row m-2">

            <!-- Busca Simples -->
            <div class="flex-1 h-30 my-10 mr-2" id="state-simple-search">
            ${StateSimpleSearch()}
            </div>
            <div class="flex flex-row">
            <button 
            id="btn-state-simple-search" 
            class="h-full p-4 bg-gray-200 cursor-pointer rounded-lg hover:bg-violet-600 active:bg-violet-700">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>

            </button>
            </div>
            </div>
 
`)
    }
}

export default TopHandlersStateInsertView;