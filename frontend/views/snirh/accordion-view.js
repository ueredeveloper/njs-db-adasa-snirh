import ListGrantsController from "../../controllers/list-grants-controller";

const AccordionView = {
    init: function (colspanValue, accordionIndex) {
        this.ListGrantsController;
        this.accordionIndex = accordionIndex;

        return this.render(colspanValue, accordionIndex);

    },
    render: function (colspanValue, accordionIndex) {
        
        // Ações dos botões
        $(`#btn-edit${accordionIndex}`).on('click', function (event) {

            event.preventDefault();

            $(`#svgPlus${accordionIndex}`).toggle();
            $(`#svgMinus${accordionIndex}`).toggle();

            $(this).toggleClass('active');

            console.log($(this).hasClass('active'))

            // Encontrar o painel próximo ao botão.
            var panel = $(this).nextAll('.panel').first();
            // Ações de fechar ou abrir o painel.
            if (panel.css('display') === 'block') {
                panel.hide();
            } else {
                panel.show();
            }
            if (!this.ListGrantsController) {

                this.ListGrantsController = new ListGrantsController.init(accordionIndex)
            }



        });

        // Ìcones dos botões
        $(`#svgMinus${accordionIndex}`).html(`
            <svg 
                class="w-4 h-4 " 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
            </svg>`);
        $(`#svgPlus${accordionIndex}`).html(`
            <svg 
                class="w-4 h-4 " 
                xmlns="http://www.w3.org/2000/svg" fill="none" 
                viewBox="0 0 24 24" stroke-width="1.5" 
                stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>`);



        // Retorno
        return `
        <tr>
            <td colspan="${colspanValue}" class="td-search border-0 p-0">
                <!-- Abertura do acordeon -->
                    <buttom id="btn-edit${accordionIndex}" class="accordion w-full h-full cursor-pointer">
                        <span id="svgPlus${accordionIndex}"></span>
                        <span id="svgMinus${accordionIndex}" style="display:none;"></span>

                    </buttom>
        
                    <!-- Div de abertura da função acordeon -->
                    <div id="list-grants-view-${accordionIndex}" 
                        class="panel overflow-auto h-32 top-0 bg-green-100 hidden">
                    </div>
            </td>
        </tr>`
    }

}

export default AccordionView;