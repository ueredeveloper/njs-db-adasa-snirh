
import SNIRHGrantsModel from "../../models/snirh/snirh-grants-model";
import MapView from "../map-view";
import AccordionContent from "./accordion-content";

const { createTheadsValues, maxLengthOfStrings, createLatLngPosition } = require("../../utils");

const ListSnirhView = {
    init: async function () {
        this.div = $('#list-snirh-view');
        this.list = await SNIRHGrantsModel.listGrants();
        this.theads = await createTheadsValues(this.list);
        this.tableId = 'list-snirh-sub';
        this.tables = [
            { class: 'list-snirh', id: 'list-snirh-sub', tipo: '1', subtipo: '2' },
            { class: 'list-snirh hidden', id: 'list-snirh-sup', tipo: '1', subtipo: '1' },
            { class: 'list-snirh hidden', id: 'list-snirh-lan', tipo: '2', subtipo: '1' },
            { class: 'list-snirh hidden', id: 'list-snirh-bar', tipo: '3', subtipo: '1' }
        ];

        this.render();

        $(document).on("updateSnirhTables", async (event, data) => {
            // Update the list with the received data
            this.list = await data;

            // Re-render the view
            this.renderContentsTables();
        });

        $(document).on('showTableById', (event, tableId) => {
            this.tableId = tableId;

            this.renderContentsTables();
        });


    },
    render: async function () {

        /* SNIRH, Tipo de Interferência - INT_TIN_CD TIPO DE INTERFERENCIA (CÓDIGO):
            1 - Captação
            2 - Lançamento
            3 - Barragem
            4 - Ponto de Referência

            SNIRH, Subtipo Interferência - INT_TSU_CD SUBTIPO DE INTERFERENCIA (CÓDIGO):

            1 - Superficial
            2 - Subterrânea

        */


        this.tables.forEach(table => {

            this.div.append(`
                <table class=${table.class} id=${table.id}>
                    <!-- congela a tag thead -->
                    <thead class="sticky top-0 z-10" >
                    </thead>
                    <tbody></tbody>
                </table>`)



        });

        // this.renderTheads();

        this.renderContentsTables();


    },
    renderTheads: async function () {

        this.tables.forEach(table => {


            let list = this.list.filter(item => item.INT_TIN_CD === table.tipo && item.INT_TSU_CD === table.subtipo)

            // Descreve tamanho mínimo de cada coluna de acordo com o tamanho da string do cabeçalho ou valor (th ou td).
            let minLenghts = maxLengthOfStrings(list);

            // Regula largura da coluna  de acordo com o tamanho do tamanho do dado (string)
            let thStyleWidth = minLenghts[0].map(ml => `style="min-width:${ml}em"`);
            //Cria os cabeçalhos (thead)
            $(`#${table.id}`).find('thead').append(`
              <tr>
              ${this.theads.map((th, index) => `<th class="th-snirh" ${thStyleWidth[index]}>${th}</th>`)}
              </tr>`)

        })

    },
    renderContentsTables: async function () {

        // Para utilizar nas tabs com botões (Superficial, Subterrâneo, ect). Se o tamanho for maior que zero, mostraráo o botão, ou se zero, não mostrará.
        let displayTabButtons = []

        this.tables.forEach(table => {

            let list = this.list.filter(item => item.INT_TIN_CD === table.tipo && item.INT_TSU_CD === table.subtipo);

            displayTabButtons.push({id: table.id, value: table.id, len: list.length})

            /* list => A lista a filtrada por tipo de outorga, subterrânea, superficial etc: 
            Exemplo:   [ 
                    {
                        "INT_CD": "926009",
                        "INT_TIN_DS": "Barragem",
                        "INT_TIN_CD": "3",
                        "INT_TSU_DS": "Superficial",
                        "INT_TSU_CD": "1",
                    },
                    ...
                ]
            */

            // Só criar theads de listas com resultado, listas vazias não.
            if (list.length !== 0) {
                // Descreve tamanho mínimo de cada coluna (style: min-width) de acordo com o tamanho da string do cabeçalho ou valor (th ou td).
                let minLenghts = maxLengthOfStrings(list);

                // Insere css com largura da coluna de acordo com o tamanho do tamanho do dado (string)
                let thStyleWidth = minLenghts[0].map(ml => `style="min-width:${ml}em"`);

                // Captura cabeçalho da tabela (thead tag).
                let thead = $(`#${table.id}`).find('thead');

                // Limpa thead.
                thead.empty();

                thead.append(`
                    <tr>
                    ${this.theads.map((th, index) => `<th class="th-snirh" ${thStyleWidth[index]}>${th}</th>`)}
                    </tr>`);

                // Captura o corpo da tabela com os dados (tbody tag).
                let tbody = $(`#${table.id}`).find('tbody');

                // Se houver dados na tabela, limpar.
                tbody.empty();

                // Captura valores de um objeto (key and value).
                let keysValues = list.map(item => {
                    return Object.entries(item);
                });

                // preenchimento do corpo da tabela (tbody tag).
                keysValues.map((item, index) => {

                    // Valor necessário para criar classe para randomizar a cor da linha (ver criação de botões).
                    let classIndex = index % 2;

                    tbody.append(
                        `
                    <tr class="tr-btn hover:bg-gray-100">
                    
                    <!-- adiciona botões -->
                    ${item.push(
                            ['', `
                            <div class="div-btn flex flex-row justify-around w-24 min-w-24 max-w-24">
                                <!-- select button -->
                                <button id="btn-snirh-selection" class="hover:bg-sky-600 active:bg-sky-700 focus:outline-none focus:ring focus:ring-sky-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                                        <path fill-rule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clip-rule="evenodd" />
                                    </svg>
                                </button>
                                <!-- copy button -->
                                <button class="hover:bg-sky-600 active:bg-sky-700 focus:outline-none focus:ring focus:ring-sky-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                                        <path d="M16.5 6a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v7.5a3 3 0 0 0 3 3v-6A4.5 4.5 0 0 1 10.5 6h6Z" />
                                        <path d="M18 7.5a3 3 0 0 1 3 3V18a3 3 0 0 1-3 3h-7.5a3 3 0 0 1-3-3v-7.5a3 3 0 0 1 3-3H18Z" />
                                    </svg>
                                </button>
                            </div>`])}
    
               
               ${item.map((_item, _index, _array) => {

                                // Se for o último index (último valor da array), onde estão os botões, mudar css e assim para congelar linhas no lado direito da tabela
                                if (_index === _array.length - 1) {
                                    // Cria td e adiciona classe (td-bg-1 ou td-bg-0) para variar cor de fundo da linha
                                    return `<td class="td-bg-${classIndex} sticky right-0 ">${_item[1]}</td>`;
                                }
                                return `<td class="td-snirh text-center">${_item[1]}</td>`
                            })
                        }
                    </tr>
                        ${AccordionContent(item.length - 1, index, item)}
                    </tr>
                    `
                    )
                });

                $('[id^="btn-snirh-selection"]').click(function () {

                    // Captura tr tag
                    let parentRow = $(this).closest('tr');
                    // Captura valores da linha  selecionada (td)
                    let tds = parentRow.find('.td-snirh');
                    // Cria objecto a partir da linha selecionada
                    let grant = {}
                    // Interage com os  valores das linhas e preenche o objeto.
                    tds.each(function (index, element) {
                        let textContent = $(element).text();
                        grant[ListSnirhView.theads[index]] = textContent
                    });
                    // Cria posição no mapa.
                    let position = createLatLngPosition(grant.INT_NU_LATITUDE, grant.INT_NU_LONGITUDE);

                    // Mostra a posição utilizando a ferramenta marcador (Marker).
                    MapView.addMarker(position, true);
                    MapView.setMapCenter(position)

                });
            } else {
                // Limpa a tabela na parte tbody quando não houver outorga
                $(`#${table.id}`).find('tbody').empty()
            }
        });

        $(document).trigger("displayTabButtons", [displayTabButtons]);

    }
}

export default ListSnirhView;