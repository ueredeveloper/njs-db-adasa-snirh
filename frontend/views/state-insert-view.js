
import MapView from "./map-view";
import StateGrantsModel from "../models/state-grants-model";

const { createTheadsValues, maxLengthOfStrings, createLatLngPosition } = require("../utils");

const StateInsertView = {
    init: async function () {
        this.div = $('#state-insert-view');
        this.list = await StateGrantsModel.list();

        this.theads = await createTheadsValues(this.list);
        this.tableId = 'state-list-sub';
        this.tables = [
            { class: 'state-list', id: 'state-list-sub', tipo: 1, subtipo: 2 },
            { class: 'state-list hidden', id: 'state-list-sup', tipo: 1, subtipo: 1 },
            { class: 'state-list hidden', id: 'state-list-lan', tipo: 2, subtipo: 1 },
            { class: 'state-list hidden', id: 'state-list-bar', tipo: 3, subtipo:  1 }
        ];

        this.render();

        /*
        $(document).on("updateInsertStateTable", async (event, data) => {
            // Update the list with the received data
            this.list = await data;

            // Re-render the view
            this.renderContentsTables();
        });

        $(document).on('showInsertTableId', (event, tableId) => {
            this.tableId = tableId;

            this.renderContentsTables();
        });*/


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

        this.renderContentsTables();

    },
    renderContentsTables: async function () {

        

        // Para utilizar nas tabs com botões (Superficial, Subterrâneo, ect). Se o tamanho for maior que zero, mostraráo o botão, ou se zero, não mostrará.
        let displayTabButtons = []


        await Promise.all(this.tables.map(async (table) => {

            /*  Tipo: INT_TIN_CD
                    1 – superficial e subterrânea 
                    2 – efluente 
                    3 - Barragem

                Subtipo: INT_TSU_CD
                    1 – superficial  
                    2 – subterrânea 
            */

            let list = this.list.filter(item => item.INT_TIN_CD === table.tipo && item.INT_TSU_CD === table.subtipo);

            displayTabButtons.push({ id: table.id, value: table.id, len: list.length })

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
            if (list.length > 0) {

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
                    
                    <!-- Adiciona botões manipuladores a cada linha de dados na tabela. -->
                    ${item.push(
                            ['', `
                            <div class="div-btn flex flex-row justify-around w-24 min-w-24 max-w-24">
                                <!-- select button -->
                                <button id="btn-snirh-selection" class="hover:bg-sky-600 active:bg-sky-700 focus:outline-none focus:ring focus:ring-sky-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                    </svg>
                                </button>
                                <!-- copy button -->
                                <button class="hover:bg-sky-600 active:bg-sky-700 focus:outline-none focus:ring focus:ring-sky-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
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
                    
                    `
                    // remove o acordeon
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
                        grant[StateInsertView.theads[index]] = textContent
                    });

                    // Cria posição no mapa.
                    let position = createLatLngPosition(grant.INT_NU_LATITUDE.replace("#", ""), grant.INT_NU_LONGITUDE.replace("#", ""));
                    
                    // Mostra a posição utilizando a ferramenta marcador (Marker).
                    MapView.addMarker(position, true);
                    MapView.setMapCenter(position)

                });
            } else {
                // Limpa a tabela na parte tbody quando não houver outorga
                $(`#${table.id}`).find('tbody').empty()
            }
        }));

        $(document).trigger("displayTabButtons", [displayTabButtons]);

    }
}

export default StateInsertView;