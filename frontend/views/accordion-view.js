import StateUpdateController from "../controllers/state-update-controller";

const AccordionView = (colspanValue, item) => {

    // Converte array em objeto (outorga)
    const federalGrant = Object.fromEntries(item);

    // Gera id único para o botão
    let btnId = `btn-edit-${item[0][1]}`; // item[0][1] = ['INT_CD', '926053'] = 926053

    $(document).ready(function () {

        // Ìcones dos botões
        $(`#svg-minus-${item[0][1]}`).html(`
            <svg 
                class="w-4 h-4" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
            </svg>`);
        $(`#svg-plus-${item[0][1]}`).html(`
            <svg 
                class="w-4 h-4" 
                xmlns="http://www.w3.org/2000/svg" fill="none" 
                viewBox="0 0 24 24" stroke-width="1.5" 
                stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>`);

        // Ação do botão
        $(`#${btnId}`).on('click', async function (event) {

            event.preventDefault();

            $(`#svg-plus-${item[0][1]}`).toggle();
            $(`#svg-minus-${item[0][1]}`).toggle();

            $(this).toggleClass('active');

            // Encontrar o painel próximo ao botão.
            var panel = $(this).nextAll('.panel').first();
            // Ações de fechar ou abrir o painel.
            if (panel.css('display') === 'block') {
                panel.hide();
            } else {
                panel.show();
            }
            if (!this.StateUpdateController) {
                // Envia id do botão e outorga federal
                this.StateUpdateController = new StateUpdateController.init(item[0][1], federalGrant)

            }
        });

    });

    return `<td colspan="${colspanValue}" class="td-search border-0 p-0">
                <button id="${btnId}" class="accordion cursor-pointer w-full focus:bg-violet-500">
                    <span id="svg-plus-${item[0][1]}"></span>
                    <span id="svg-minus-${item[0][1]}" style="display:none;"></span>
                </button>
                <!-- Div de abertura da função acordeon -->
                <div id="list-grants-view-${item[0][1]}" 
                    class="panel overflow-auto h-48 top-0 hidden m-2">
                </div>
            </td>
            `;
}

export default AccordionView;