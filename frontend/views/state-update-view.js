
import StateGrantsModel from "../models/state-grants-model";
import snirhError from "../services/snirh-error";
import snirhUpdate from "../services/snirh-update";
import { createLatLngPosition, getLatLng, maxLengthOfStrings } from "../utils";
import MapView from "./map-view";

const StateUpdateView = {

    init: async function (federalGrant, accordionIndex, latitude, longitude, ti) {

        this.federalGrant = federalGrant;

        this.div = $(`#list-grants-view-${accordionIndex}`);

        this.accordionIndex = accordionIndex;
        // Busca por proximidade as outorgas e indica qual tipo de interferência (ti).
        // - Replace: remove o sinal # da coordenada. Ex: let latitude = "#-15.123456"
        this.stateGrants = await StateGrantsModel.selectClosestPoints(latitude.replace("#", ""), longitude.replace("#", ""), ti);
        // Valores das colunas de cabeçalho da lista de outorgas.
        this.theads = await this.createTheadsValues();
        // Renderização da tabela com cabeçalho.
        this.render();
        // Renderização das outorgas.
        this.renderSubterranea(accordionIndex);
    },

    render: function async() {


        let tables = [
            { className: 'state-list', id: `list-sub-${this.accordionIndex}`, },
            // hidden: não mostrar no  início, somente mostrar as outorgas subterrâneas
            { className: 'state-list hidden', id: `list-sup-${this.accordionIndex}`, }
        ]

        tables.forEach(table => {

            this.div.append(`
            <table class="${table.className} w-full " id=${table.id}>
                <!-- congela a tag thead -->
                <!-- z-index 9, thead acima do scroll das linhas -->
                <thead class="sticky top-0" style="z-index:9" >
                </thead>
                <tbody></tbody>
            </table>
        `)

            this.renderTheads(table.id)

        });

    },
    renderTheads: async function (id) {

        if (this.stateGrants.length > 0) {

            // Descreve tamanho mínimo de cada coluna de acordo com o tamanho da string do cabeçalho ou valor (th ou td).
            let minLenghts = maxLengthOfStrings(await this.stateGrants);

            // Regula largura da coluna  de acordo com o tamanho do tamanho do dado (string)
            let thStyleWidth = minLenghts[0].map(ml => `style="min-width:${ml}rem;max-width:${ml}rem;"`);
            //Cria os cabeçalhos (thead)
            $(`#${id}`).find('thead').append(`
              <tr>
              ${this.theads.map((th, index) => `<th class="th-state-update" ${thStyleWidth[index]}>${th}</th>`)}
              </tr>`)
        }

    },
    renderSubterranea: async function (accordionIndex) {

        let tbody = $(`#list-sub-${accordionIndex}`).find('tbody')

        let keysValues = await this.stateGrants.map(item => {
            return Object.entries(item);
        });

        // preenchimento da tbody tag
        keysValues.map((item, index) => {

            // Valor necessário para criar classe para randomizar a cor da linha (ver criação de botões).
            let classIndex = index % 2;

            tbody.append(
                `
           <tr class="tr-btn hover:bg-gray-100">
        
           <!-- adiciona botões -->
           ${item.push(['', `
            <div class="div-btn flex flex-row justify-around w-24 min-w-24 max-w-2">
                <!-- Botão de setar o ponto no mapa -->
                <button id="btn-selection" class="hover:bg-sky-600 active:bg-sky-700 focus:outline-none focus:ring focus:ring-sky-300">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                </button>
                <!-- CheckBox  de selecionar interferência. O id é o atributo INT_CD_ORIGEM da interferência 
                    O nome destes inputs não pode ser o nome dos outros em outras linhas, por isso o acréscimo this.accordionIndes.
                -->
                <input type="radio" id="${item[1][1]}" class="radio-update-state-group" name="state-${this.accordionIndex}">
                <!-- Botão de Salvar -->
                <button id="btn-update" class="hover:bg-sky-600 active:bg-sky-700 focus:outline-none focus:ring focus:ring-sky-300">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                </button>
                
            </div>
           
           
           `])}
       
           ${item.map((item, index, array) => {
                    // Se for o último index (último valor da array), onde estão os botões, mudar css e assim para congelar linhas no lado direito da tabela
                    if (index === array.length - 1) {
                        // Cria td e adiciona classe (td-bg-1 ou td-bg-0) para variar cor de fundo da linha
                        return `<td class="td-bg-${classIndex} sticky right-0 z-7">${item[1]}</td>`;
                    }
                    return `<td class="td-state-update text-center">${item[1]}</td>`
                })
                }</tr>`
            )
        });

        $('[id^="btn-selection"]').click(function () {

            // Captura tr tag
            let parentRow = $(this).closest('tr');
            // Captura valores da linha  selecionada (td)
            let tds = parentRow.find('.td-state-update');
            // Cria objecto a partir da linha selecionada
            let grant = {}
            // Interage com os  valores das linhas e preenche o objeto.
            tds.each(function (index, element) {
                let textContent = $(element).text();
                grant[StateUpdateView.theads[index]] = textContent
            });
            // Cria posição no mapa.

            let latLng = getLatLng(grant)
            let position = createLatLngPosition(latLng.lat, latLng.lng);

            // Mostra a posição utilizando a ferramenta marcador (Marker) sem animação (false).
            MapView.addMarker(position, false);
            // Centralizar o mapa na posição do marcador adicionado.
            MapView.setMapCenter(position);

        });

        $('[id^="btn-update"]').click(async function () {

            // Captura tr tag
            let parentRow = $(this).closest('tr');
            // Captura valores da linha  selecionada (td)
            let tds = parentRow.find('.td-state-update');
            // Cria objecto a partir da linha selecionada
            let stateGrant = {}
            // Interage com os  valores das linhas e preenche o objeto.
            tds.each(function (index, element) {
                let textContent = $(element).text();
                stateGrant[StateUpdateView.theads[index]] = textContent
            });
            // Adicionar body como uma array, mesmo sendo um só registro, ex: [{stateGrant: ..., federalGrant: ...}]
            let toUpdate = [{
                stateGrant: stateGrant,
                federalGrant: StateUpdateView.federalGrant
            }]
    
            let response = await snirhUpdate('DF', toUpdate);
            // response example: {sucesso: false, mensagem: 'Erro ao processar solicitação.', idArquivoErro: 13261}
            console.log(response)
            if (response.sucesso === true) {
                alert(response.mensagem)
            } else {

                let params = {
                    uf: 'DF',
                    idArquivoErro: response.idArquivoErro
                }
                await snirhError(params).then(errorResponse =>{ 
                    
                    console.log(errorResponse)
                    alert('Erro: ' + errorResponse)});

            }

        });
    },
    createTheadsValues: async function () {

        if (this.stateGrants.length > 0) {

            // Captura o primeiro objeto com os valores (key, value)
            let keyValues = Object.entries(await this.stateGrants[0]);
            // Separa os valores `key` para criar os cabeçalhos (thead)

            let theads = keyValues.map(th => th[0]);
            // Adiciona coluna a mais para  os botões
            theads.push(``);

            return theads;
        }

    },
    /**
     * Cria posição de acordo com Gmaps API.
     * @param {*} latitude 
     * @param {*} longitude 
     * @returns {object} position. Posição geográfica Gmaps API.
     */
    createLatLngPosition: function (latitude, longitude) {
        // Converte o valor para float e muda vígula para  ponto.
        let position = { lat: parseFloat(latitude.replace(/,/g, '.')), lng: parseFloat(longitude.replace(/,/g, '.')) }
        return position;
    },
    /**
     * Busca uma outorga estadual relacionada com a outorga federal.
     * @param {*} origemId Id da outorga estadual: INT_CD_ORIGEM.
     * @returns Retorna uma outorga estadual relacionada com a outorga federal pelo atributo estadual INT_CD_ORIGEM.
     */
    findStateGrant: function (origemId) {
        let stateGrant = this.stateGrants.find(item => item.INT_CD_ORIGEM === Number(origemId))
        return stateGrant;
    }
}

export default StateUpdateView;