const ManageDataView = {
    init: function () {
        this.div = $('#manage-data-view');
        this.buttons = [
            { id: 'btn-manage-insert', innerHTML: 'Inserir', value: 'insert' },
            { id: 'btn-manage-update', innerHTML: 'Editar', value: 'update' },
        ]

        this.render();

    },
    render: function () {

        this.buttons.forEach(button => {
            this.div.append(`
            <button 
                class="managers-buttons bg-gray-200 hover:bg-gray-300 p-1.5 my-0.5" 
                id=${button.id} value=${button.value}>
                ${button.innerHTML}
            </button>`)


        });
        // Ação na classe .managers-buttons
        $('.managers-buttons').on('click', function () {

            // Remove a classe 'active' de todos os botões
            $('.managers-buttons').removeClass('active');

            // Adiciona 'active' no botão clicado
            $(this).addClass('active');

            // adiciona class hidden (display: none) que remove a tabela do documento.
            $('.div-manage').addClass('hidden');
            // remove o display: hidden da tabela que se quer mostrar
            // adiciona a tabela na tela com display: block.
            $(`#${this.value}`).removeClass('hidden').addClass('block');

        });
    }

}

export default ManageDataView;