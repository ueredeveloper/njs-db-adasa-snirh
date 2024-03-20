import SNIRHGrantsModel from "../../models/snirh/snirh-grants-model";

const { createTheadsValues, maxLengthOfStrings } = require("../../utils");

const ListGrantsSNIRHView = {
    init: async function () {
        this.div = $('#list-snirh-grants-view');
        this.list = await SNIRHGrantsModel.listGrants();
        this.theads = await createTheadsValues(this.list);
        this.render();




    },
    render: async function () {

        let grantsTables = [
            { className: 'list-grants-snirh-tables', id: 'list-snirh-sub', },
            { className: 'list-grants-snirh-tables hidden', id: 'list-snirh-sup', }
        ]

        grantsTables.forEach(table => {
            
            this.div.append(`
            <table class=${table.className} id=${table.id}>
                <!-- congela a tag thead -->
                <thead class="sticky top-0" >
                </thead>
                <tbody></tbody>
            </table>
        `)

          this.renderTheads(table.id);

          this.renderTBodys();

        });

    }, 
    renderTheads: async function(tableId){

        // Descreve tamanho mínimo de cada coluna de acordo com o tamanho da string do cabeçalho ou valor (th ou td).
        let minLenghts = maxLengthOfStrings(await this.list);

        // Regula largura da coluna  de acordo com o tamanho do tamanho do dado (string)
        let thStyleWidth = minLenghts[0].map(ml => `style="min-width:${ml}em"`);
        //Cria os cabeçalhos (thead)
        $(`#${tableId}`).find('thead').append(`
              <tr>
              ${this.theads.map((th, index) => `<th class="bg-gray-200" ${thStyleWidth[index]}>${th}</th>`)}
              </tr>`)

    },
    renderTBodys: async function(){
        let tbody = $('#list-snirh-sub').find('tbody')

        let keysValues = await this.list.map(item => {
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
            </div>
           
           
           `])}
       
           ${item.map((item, index, array) => {
                    // Se for o último index (último valor da array), onde estão os botões, mudar css e assim para congelar linhas no lado direito da tabela
                    if (index === array.length - 1) {
                        // Cria td e adiciona classe (td-bg-1 ou td-bg-0) para variar cor de fundo da linha
                        return `<td class="td-bg-${classIndex} sticky right-0 ">${item[1]}</td>`;
                    }
                    return `<td class="td-snirh-grants-data text-center">${item[1]}</td>`
                })
                }</tr>`
            )
        });

        $('[id^="btn-snirh-selection"]').click(function () {

            // Captura tr tag
            let parentRow = $(this).closest('tr');
            // Captura valores da linha  selecionada (td)
            let tds = parentRow.find('.td-snirh-grants-data');
            // Cria objecto a partir da linha selecionada
            let grant = {}
            // Interage com os  valores das linhas e preenche o objeto.
            tds.each(function (index, element) {
                let textContent = $(element).text();
                grant[ListGrantsView.theads[index]] = textContent
            });
            // Cria posição no mapa.
            let position = ListGrantsView.createLatLngPosition(grant.INT_CR_LATITUDE, grant.INT_CR_LONGITUDE);

            // Mostra a posição utilizando a ferramenta marcador (Marker).
            MapView.addMarker(position);

        });
    }
}

export default ListGrantsSNIRHView;