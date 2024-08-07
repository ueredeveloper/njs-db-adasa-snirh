const TabInsertView = {
    init: function () {
        this.div = $('#tab-insert-view');
        this.buttons = [
            { id: 'btn-insert-sub', innerHTML: 'Subterrâneo', value: 'state-list-sub' },
            { id: 'btn-insert-sup', innerHTML: 'Superficial', value: 'state-list-sup'},
            { id: 'btn-insert-lan', innerHTML: 'Lançamento', value: 'state-list-lan'},
            { id: 'btn-insert-bar', innerHTML: 'Barragem', value: 'state-list-bar'},
        ];

        this.render();

        /**
         * Mostrar ou não o botão se houver ou não dados para mostrar no botão específico. 
         *  Ex: se não houver lançamentos não mostrará o botão lançamentos.
         */
        /*$(document).on("displaybuttons", async (event, data) => {
            data.forEach(item => {

                const button = $(`.insert-links[value="${item.value}"]`);
                
                if (item.len > 0) {
                    button.show();

                // se item len < 0, a lista está vazia e por isso não precisa mostrar o botão.
                } else {
                    button.hide();
                }
            });
        });*/

        
    },
    render: function () {

       
        this.buttons.forEach(button => this.div.append(`
            <button 
                class="insert-links bg-gray-200 hover:bg-gray-300 p-1.5" 
                id=${button.id} value=${button.value}>
                ${button.innerHTML}
            </button>`))


        $('.insert-links').on('click', function() {
            let tableId = $(this).val();

            // Remove a classe 'active' de todos os botões
            $('.insert-links').removeClass('active');
            

            // Adiciona 'active' no botão clicado
            $(this).addClass('active');
        
            // adiciona class hidden (display: none) que remove a tabela do documento.
            $('.state-list').addClass('hidden');
            // remove o display: hidden da tabela que se quer mostrar
            // adiciona a tabela na tela com display: block.
            $(`#${tableId}`).removeClass('hidden').addClass('block');

            $(document).trigger('showTableById', tableId);

        });

       


    }
}

export default TabInsertView;