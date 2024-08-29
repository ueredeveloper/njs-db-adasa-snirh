import exportCsv from "../services/export-csv";
import snirhParams from "../shared/snirh-params";

const FederalPaginationView = {
    init: function () {
        this.div = $('#pagination-view');
        this.params = snirhParams.getSnirhParams();
        this.render();

        // Selectiona o valor que aparece de acordo com o parãmetro, tamanhoPagina.
        $(document).ready(function () {
            $('#sl-quantity').val(FederalPaginationView.params.tamanhoPagina);

            $('#sl-quantity').on('change', function () {
                let tamanhoPagina = parseInt($(this).val(), 10)
                // Atualizar valor compartilhado pelas páginas.
                snirhParams.setSnirhParams({ ...FederalPaginationView.params, tamanhoPagina: tamanhoPagina })
            })

            $('#previous-page').on('click', async function () {
                // Get the component with the active class
                let component = $('.pagination-active');

                // Captura o valor do componente ativo
                let activeValue = parseInt(component.text(), 10);

                // Calcula o valor anterior, porém se ele for 1 continua sendo 1
                let previousValue = activeValue > 1 ? activeValue - 1 : 1;

                // Remove the active class from all pagination items
                $('.pagination').removeClass('pagination-active');

                // Add the active class to the previous pagination item
                $('.pagination').filter(function () {
                    return parseInt($(this).text(), 10) === previousValue;
                }).addClass('pagination-active');
                // Atualizar a página que poderá ser solicitada.
                let pagina = parseInt($('.pagination-active').text(), 10)
                // Atualizar valor compartilhado pelas páginas.
                snirhParams.setSnirhParams({ ...FederalPaginationView.params, pagina: pagina });

                console.log('previous ', snirhParams.getSnirhParams())

                    // Atualiza os valores após buscar no serviço e envia para `ListSnirhView`.
                    let { data } = await exportCsv(snirhParams.getSnirhParams());
                    // Remove o último ítem, no servidor, ao converter csv para json, o último resultado vem vazio.
                    data.pop();

                    $(document).trigger("updateSnirhTables", [data]);

            });

            $('#next-page').on('click', async function () {
                // Get the component with the active class
                let component = $('.pagination-active');

                // Captura o valor do componente ativo
                let activeValue = parseInt(component.text(), 10);

                // Calcula o valor anterior, porém se ele for 1 continua sendo 1
                let previousValue = activeValue < 6 ? activeValue + 1 : 6;

                // Remove the active class from all pagination items
                $('.pagination').removeClass('pagination-active');

                // Add the active class to the previous pagination item
                $('.pagination').filter(function () {
                    return parseInt($(this).text(), 10) === previousValue;
                }).addClass('pagination-active');
                // Atualizar a página que poderá ser solicitada.
                let pagina = parseInt($('.pagination-active').text(), 10)
                // Atualizar valor compartilhado pelas páginas.
                snirhParams.setSnirhParams({ ...FederalPaginationView.params, pagina: pagina });

                console.log('next ', snirhParams.getSnirhParams())

                // Atualiza os valores após buscar no serviço e envia para `ListSnirhView`.
                let { data } = await exportCsv(snirhParams.getSnirhParams());
                // Remove o último ítem, no servidor, ao converter csv para json, o último resultado vem vazio.
                data.pop();

                $(document).trigger("updateSnirhTables", [data]);

            });
            $('.pagination').on('click', async function () {

                // Remove a classe pagination-active de todas as tags
                $('.pagination').removeClass('pagination-active');

                // Adiciona a classe pagination-active na tag selecionada
                $(this).addClass('pagination-active');

                let pagina = parseInt($(this).text(), 10);
                snirhParams.setSnirhParams({ ...FederalPaginationView.params, pagina: pagina })

                console.log('on click numbers ', snirhParams.getSnirhParams())

                // Atualiza os valores após buscar no serviço e envia para `ListSnirhView`.
                let { data } = await exportCsv(snirhParams.getSnirhParams());
                // Remove o último ítem, no servidor, ao converter csv para json, o último resultado vem vazio.
                data.pop();

                $(document).trigger("updateSnirhTables", [data]);
            });

        });

    },
    render: function () {
        this.div.append(`
            <div class="flex flex-row py-1">
                <div class="mx-2">
                    <a id="previous-page" class="cursor-pointer px-1">&laquo;</a>
                    <a class="pagination pagination-active cursor-pointer px-1">1</a>
                    <a class="pagination cursor-pointer px-1">2</a>
                    <a class="pagination cursor-pointer px-1">3</a>
                    <a class="pagination cursor-pointer px-1">4</a>
                    <a class="pagination cursor-pointer px-1">5</a>
                    <a class="pagination cursor-pointer px-1">6</a>
                    <a id="next-page" class="cursor-pointer px-1">&raquo;</a>
                </div>
                <div>
                    <select id="sl-quantity" class="px-2">
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
    }




}

export default FederalPaginationView;