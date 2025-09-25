import exportCsv from "../services/export-csv";
import snirhParams from "../shared/snirh-params";



const FederalPaginationView = {
    init: function () {
        this.div = $('#pagination-view');
        this.params = snirhParams.getSnirhParams();
        this.pages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        this.render();

        // Selectiona o valor que aparece de acordo com o parãmetro, tamanhoPagina.
        $(document).ready(function () {
            $('#sl-quantity').val(FederalPaginationView.params.tamanhoPagina);

            $('#sl-quantity').on('change', async function () {
                let tamanhoPagina = parseInt($(this).val(), 10)
                // Atualizar valor compartilhado pelas páginas.
                snirhParams.setSnirhParams({ tamanhoPagina: tamanhoPagina })

                if(!this.params) {
                    this.params = snirhParams.getSnirhParams();
                }

                // Atualiza os valores após buscar no serviço e envia para `ListSnirhView`.
                let { data } = await exportCsv(snirhParams.getSnirhParams());
                // Remove o último ítem, no servidor, ao converter csv para json, o último resultado vem vazio.
                data.pop();

                $(document).trigger("updateSnirhTables", [data]);
            })

            $('#previous-page').on('click', async function () {

                let pages = FederalPaginationView.pages;

                let firstPageNumber = pages[0];

                if (firstPageNumber > 1) {
                    // remove o primeiro elemento
                    pages.pop()
                    let firstElement = $('#pagination .page-numbers').first();
                    let previousElementNumber = parseInt($(firstElement).html(), 10) - 1
                    let newPages = [previousElementNumber, ...pages]
                    pages = newPages;

                    $('#pagination a').each(function (index) {
                        if (index < pages.length) {
                            $(this).html(pages[index]);
                        }
                    });

                    // Captura o element ativo
                    let activeElement = $('#pagination .active-page');
                    // Era para capturar o previous (prev), mas como atualizou os valores nas tags, pegas-se o próximo (next)

                    // Como foi mudado os valores das tags a, é preciso capturar não o valor anterior, mas sim o posterior
                    let previousElement = activeElement.next('.page-numbers');
                    // Ele captura o elemento anterior e como atualizar os valores nas tags, adiciona +1.
                    let previousElementValue = parseInt(previousElement.html(), 10);

                    // Todo movimento de paginação somente se o valor inicial for maior ou igual a 1
                    if (previousElementValue >= 1) {
                        setActiveTag('active-page', previousElement)
                    }

                } else {

                    // Captura o element ativo
                    let activeElement = $('#pagination .active-page');
                    // Captura o valor anterior
                    let previousElement = activeElement.prev('.page-numbers');

                    let previousElementValue = parseInt(previousElement.html(), 10);

                    // Todo movimento de paginação somente se o valor inicial for maior ou igual a 1
                    if (previousElementValue >= 1) {
                        setActiveTag('active-page', previousElement)
                    }

                }

                FederalPaginationView.pages = pages;

                // Atualizar a página que poderá ser solicitada.
                // Ele captura o elemento anterior e como atualizar os valores nas tags, adiciona +1.
                let pagina = parseInt($('.active-page').text(), 10)

                // Atualizar valor compartilhado pelas páginas.
                snirhParams.setSnirhParams({ pagina: pagina });

                // Atualiza os valores após buscar no serviço e envia para `ListSnirhView`.
                let { data } = await exportCsv(snirhParams.getSnirhParams());
                // Remove o último ítem, no servidor, ao converter csv para json, o último resultado vem vazio.
                data.pop();

                $(document).trigger("updateSnirhTables", [data]);

            });

            $('#next-page').on('click', async function () {

                let activeElement = $('#pagination .active-page');
                let activeElementNumber = parseInt($(activeElement).html(), 10)

                let pages = FederalPaginationView.pages;

                let lastPageNumber = pages[pages.length - 1];

                if (lastPageNumber === activeElementNumber) {
                    // remove o primeiro
                    pages.shift()
                    // adiciona mais um após o último valor
                    let lastPagePlusOne = lastPageNumber + 1
                    pages.push(lastPagePlusOne);
                    // modificar innerHTML das tags para valores da nova array
                    $('#pagination a').each(function (index) {
                        if (index < pages.length) {
                            $(this).html(pages[index]);
                        }
                    });

                    FederalPaginationView.pages = pages;

                } else {

                    // Captura o element ativo
                    let activeElement = $('#pagination .active-page');
                    // Captura o elemento subsequente, que agora será o ativo
                    let nextElement = activeElement.next('.page-numbers');

                    setActiveTag('active-page', nextElement)
                }

                // Atualizar a página que poderá ser solicitada.
                let pagina = parseInt($('.active-page').text(), 10)

                // Atualizar valor compartilhado pelas páginas.
                snirhParams.setSnirhParams({ pagina: pagina });

                // Atualiza os valores após buscar no serviço e envia para `ListSnirhView`.
                let { data } = await exportCsv(snirhParams.getSnirhParams());
                // Remove o último ítem, no servidor, ao converter csv para json, o último resultado vem vazio.
                data.pop();

                $(document).trigger("updateSnirhTables", [data]);

            });

            $('.page-numbers').on('click', async function () {

                // Remove a classe active-page de todas as tags
                $('.page-numbers').removeClass('active-page');

                // Adiciona a classe active-page na tag selecionada
                $(this).addClass('active-page');

                let pagina = parseInt($(this).text(), 10);
                snirhParams.setSnirhParams({ pagina: pagina })

                // Atualiza os valores após buscar no serviço e envia para `ListSnirhView`.
                let { data } = await exportCsv(snirhParams.getSnirhParams());
                // Remove o último ítem, no servidor, ao converter csv para json, o último resultado vem vazio.
                data.pop();
                console.log('pagination: ', pagina, data.length)

                $(document).trigger("updateSnirhTables", [data]);
            });

        });

    },
    render: function () {
        this.div.append(`
            <div class="flex flex-row py-1">
                <div class="mx-2" id="pagination">
                    <input type="button" id="previous-page" class="cursor-pointer px-1" value="&laquo;"/>
                    <a class="page-numbers active-page cursor-pointer px-1">1</a>
                    <a class="page-numbers cursor-pointer px-1">2</a>
                    <a class="page-numbers cursor-pointer px-1">3</a>
                    <a class="page-numbers cursor-pointer px-1">4</a>
                    <a class="page-numbers cursor-pointer px-1">5</a>
                    <a class="page-numbers cursor-pointer px-1">6</a>
                    <a class="page-numbers cursor-pointer px-1">7</a>
                    <a class="page-numbers cursor-pointer px-1">8</a>
                    <a class="page-numbers cursor-pointer px-1">9</a>
                    <a class="page-numbers cursor-pointer px-1">10</a>
                    <input type="button" id="next-page" class="cursor-pointer px-1" value="&raquo;"/>
                </div>
                <div>
                    <select id="sl-quantity" class="px-2">
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                        <option value="200">200</option>
                        <option value="300">300</option>
                        <option value="400">400</option>
                    </select>
                </div>
            </div>

            `
        )
    },






}


/* className. Nome da classe que será removida
    tag. Tag que será adicionado a classe
*/
function setActiveTag(className, tag) {
    $(`.${className}`).removeClass('active-page');
    tag.addClass(className)
}

export default FederalPaginationView;