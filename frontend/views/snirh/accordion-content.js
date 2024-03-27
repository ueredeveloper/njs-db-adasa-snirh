import ListGrantsController from "../../controllers/list-grants-controller";

const AccordionContent = (colspanValue, accordionIndex) => {

    const $this = $(this);

    // Gera id único para o botão
    let btnId = `btn-edit-${accordionIndex}`;


    $(document).ready(function () {

        // Ìcones dos botões
        $(`#svgMinus${accordionIndex}`).html(`
            <svg 
                class="w-4 h-4" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
            </svg>`);
        $(`#svgPlus${accordionIndex}`).html(`
            <svg 
                class="w-4 h-4" 
                xmlns="http://www.w3.org/2000/svg" fill="none" 
                viewBox="0 0 24 24" stroke-width="1.5" 
                stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>`);

        // Ação do botão
        $(`#${btnId}`).on('click', function (event) {

            event.preventDefault();

            $(`#svgPlus${accordionIndex}`).toggle();
            $(`#svgMinus${accordionIndex}`).toggle();

            $(this).toggleClass('active');

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

    });

    return `<td colspan="${colspanValue}" class="td-search border-0 p-0">
                <button id="${btnId}" class="accordion cursor-pointer w-full">
                    <span id="svgPlus${accordionIndex}"></span>
                    <span id="svgMinus${accordionIndex}" style="display:none;"></span>
                </button>
                <!-- Div de abertura da função acordeon -->
                <div id="list-grants-view-${accordionIndex}" 
                    class="panel overflow-auto h-48 top-0 hidden m-2">
                </div>
            </td>
            `;
}

export default AccordionContent;