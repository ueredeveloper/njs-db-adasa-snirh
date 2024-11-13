const TabUpdateView = {
    init: function () {
        this.div = $('#tab-update-view');
        this.tabButtons = [
            { id: 'btn-list-sub', innerHTML: 'Subterrâneo', value: 'federal-list-sub' },
            { id: 'btn-list-sup', innerHTML: 'Superficial', value: 'federal-list-sup'},
            { id: 'btn-list-lan', innerHTML: 'Lançamento', value: 'federal-list-lan'},
            { id: 'btn-list-bar', innerHTML: 'Barragem', value: 'federal-list-bar'},
        ];

        this.render();

        /**
         * Mostrar ou não o botão se houver ou não dados para mostrar no botão específico. 
         *  Ex: se não houver lançamentos não mostrará o botão lançamentos.
         */
        $(document).on("displayTabButtons", async (event, data) => {
            data.forEach(item => {

                const button = $(`.tablinks[value="${item.value}"]`);
                
                if (item.len > 0) {
                    button.show();

                // se item len < 0, a lista está vazia e por isso não precisa mostrar o botão.
                } else {
                    button.hide();
                }
            });
        });

        
    },
    render: function () {

       
        this.tabButtons.forEach(button => this.div.append(`
            <button 
                class="tablinks bg-gray-200 hover:bg-gray-300 p-1.5" 
                id=${button.id} value=${button.value}>
                ${button.innerHTML}
            </button>`))


        $('.tablinks').on('click', function() {
            let tableId = $(this).val();

            // Remove a classe 'active' de todos os botões
            $('.tablinks').removeClass('active');
            

            // Adiciona 'active' no botão clicado
            $(this).addClass('active');
        
            // adiciona class hidden (display: none) que remove a tabela do documento.
            $('.federal-list').addClass('hidden');
            // remove o display: hidden da tabela que se quer mostrar
            // adiciona a tabela na tela com display: block.
            $(`#${tableId}`).removeClass('hidden').addClass('block');

            $(document).trigger('showTableStateUpdateById', tableId);

        });

       


    }
}

export default TabUpdateView;