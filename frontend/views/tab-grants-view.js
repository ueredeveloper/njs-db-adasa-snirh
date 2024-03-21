const TabGrantsView = {
    init: function () {
        this.div = $('#tab-grants-view');
        this.render();

    },
    render: function () {

        let tabButtons = [
            { id: 'btn-list-sub', innerHTML: 'Subterrâneo', value: 'list-snirh-sub' },
            { id: 'btn-list-sup', innerHTML: 'Superficial', value: 'list-snirh-sup'}
        ]
        tabButtons.forEach(button => this.div.append(`
            <button 
                class="tablinks bg-gray-200 hover:bg-gray-300 p-1.5" 
                id=${button.id} value=${button.value}>
                ${button.innerHTML}
            </button>`))


        $('.tablinks').on('click', function() {
            let tableId = $(this).val();

            console.log(tableId)
            // Remove a classe 'active' de todos os botões
            $('.tablinks').removeClass('active');
            

            // Adiciona 'active' no botão clicado
            $(this).addClass('active');
        
            // adiciona class hidden (display: none) que remove a tabela do documento.
            $('.list-grants-snirh-tables').addClass('hidden');
            // remove o display: hidden da tabela que se quer mostrar
            // adiciona a tabela na tela com display: block.
            $(`#${tableId}`).removeClass('hidden').addClass('block');
        });

       


    }
}

export default TabGrantsView;