
import SNIRHGrantsModel from "../models/federal-grants-model";
import MapView from "./map-view";
import AccordionView from "./accordion-view";
import StateUpdateView from "./state-update-view";
import toUpdateGrants from "../shared/to-update-grants";

const { createTheadsValues, maxLengthOfStrings, createLatLngPosition } = require("../utils");

const FederalView = {
    init: async function () {
        this.div = $('#federal-view');
        this.federalGrants = await SNIRHGrantsModel.listGrants();
        this.theads = await createTheadsValues(this.federalGrants);
        this.tableId = 'federal-list-sub';
        this.tables = [
            { class: 'federal-list', id: 'federal-list-sub', tipo: '1', subtipo: '2' },
            { class: 'federal-list hidden', id: 'federal-list-sup', tipo: '1', subtipo: '1' },
            { class: 'federal-list hidden', id: 'federal-list-lan', tipo: '2', subtipo: '1' },
            { class: 'federal-list hidden', id: 'federal-list-bar', tipo: '3', subtipo: '1' }
        ];

        this.render();

        $(document).on("updateSnirhTables", async (event, data) => {
            // Update the list with the received data
            this.federalGrants = await data;

            console.log(this.federalGrants)

            // Re-render the view
            this.renderContentsTables();
        });

        $(document).on('showTableStateUpdateById', (event, tableId) => {

            console.log('show table state update by id')
            this.tableId = tableId;

            this.renderContentsTables();
        });

        $(document).on("change", "input.cb-federal-group", function () {
            // Verifica se o checkbos foi selecionado
            var isChecked = $(this).is(":checked");

            // Captura o id do checkbox clicado.
            var federalGrantId = $(this).attr('id');

            if (isChecked) {
                let tr = $(this).closest('tr');
                let tds = tr.find('.td-snirh');
                let federalGrant = {}
                // Interage com os  valores das linhas e preenche o objeto.
                tds.each(function (index, element) {
                    let textContent = $(element).text();
                    federalGrant[FederalView.theads[index]] = textContent
                });


                // Captura o input tipo radio clicado pelo usuário
                let stateGrantInput = $(`#list-sub-${federalGrantId}`).find('input.radio-update-state-group[type="radio"]:checked')
                // Captura os dados próximos a input, que são os dados da outorga estadual
                let statTrs = stateGrantInput.closest('tr');

                // Captura valores da linha  selecionada (td)
                let stateTds = statTrs.find('.td-state-update');
                // Cria objecto a partir da linha selecionada
                let stateGrant = {}
                // Interage com os  valores das linhas e preenche o objeto.
                stateTds.each(function (index, element) {
                    let textContent = $(element).text();
                    stateGrant[StateUpdateView.theads[index]] = textContent
                });

                // Cria objeto de edição para envio pelo serviço SNIRH
                let toUpdate = {
                    stateGrant: stateGrant,
                    federalGrant: federalGrant
                }
                // Se a outorga estadual estiver vazia não adiciona.
                if (Object.keys(toUpdate.stateGrant).length === 0 && toUpdate.stateGrant.constructor === Object) {
                    let newToUpdateList = toUpdateGrants.getToUpdateGrants().filter(item => item.federalGrant.INT_CD !== federalGrantId);
                    toUpdateGrants.setToUpdateGrants(newToUpdateList);

                    console.log('if remove ', toUpdateGrants.getToUpdateGrants())

                } else {
                    // Se a outorga estadual está presente adiciona o objeto para edição.
                    let newToUpdateList = toUpdateGrants.getToUpdateGrants();
                    newToUpdateList.push(toUpdate)
                    toUpdateGrants.setToUpdateGrants(newToUpdateList);

                    console.log('else add ', toUpdateGrants.getToUpdateGrants())
                }

                // Se input desselecionado remove objeto dos ítems a ser editado no serviço SNIRH.
            } else {
                let newToUpdateList = toUpdateGrants.getToUpdateGrants().filter(item => item.federalGrant.INT_CD !== federalGrantId);
                toUpdateGrants.setToUpdateGrants(newToUpdateList);

                console.log('else remove', toUpdateGrants.getToUpdateGrants())
            }


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

        this.renderContentsTables();

    },

    renderContentsTables: async function () {



        // Para utilizar nas tabs com botões (Superficial, Subterrâneo, ect). Se o tamanho for maior que zero, mostraráo o botão, ou se zero, não mostrará.
        let displayTabButtons = []


        await Promise.all(this.tables.map(async (table) => {


            let list = this.federalGrants.filter(item => item.INT_TIN_CD === table.tipo && item.INT_TSU_CD === table.subtipo);

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
                console.log(keysValues)


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
                                <!-- Botão de setar o ponto no mapa -->
                                <button id="btn-marker" class="hover:bg-sky-600 active:bg-sky-700 focus:outline-none focus:ring focus:ring-sky-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                    </svg>
                                </button>
                                <!-- CheckBox  de selecionar interferência. O id é o atributo INT_CD da interferência -->
                                <input type="checkbox" id="${item[0][1]}" class="cb-federal-group">
                                
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
                        ${AccordionView(item.length - 1, item)}
                    </tr>
                    `
                    )
                });

                $('[id^="btn-marker"]').click(function () {

                    // Captura tr tag
                    let parentRow = $(this).closest('tr');
                    // Captura valores da linha  selecionada (td)
                    let tds = parentRow.find('.td-snirh');
                    // Cria objecto a partir da linha selecionada
                    let grant = {}
                    // Interage com os  valores das linhas e preenche o objeto.
                    tds.each(function (index, element) {
                        let textContent = $(element).text();
                        grant[FederalView.theads[index]] = textContent
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

    },
    getFederalGrants: function(){
        return this.federalGrants;
    }
}

export default FederalView;