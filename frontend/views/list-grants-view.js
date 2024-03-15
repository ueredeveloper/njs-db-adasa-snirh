import SubterraneaModel from "../models/subterranea-model";
import { maxLengthOfStrings } from "../utils";

const ListGrantsView = {
    init: function () {
        this.div = $('#list-grants-view')
        this.render();
        this.renderSubterranea();
    },
    render: function async() {

        let grantsTables = [
            { className: 'list-grants-tables', id: 'list-sub', },
            { className: 'list-grants-tables hidden', id: 'list-sup', }
        ]

        grantsTables.forEach(table => {

            this.div.append(`
            <table class=${table.className} id=${table.id}>
                <!-- congela a tag thead -->
                <thead class="sticky top-0 z-10" >
                </thead>
                <tbody></tbody>
            </table>
        `)

            this.renderTheadsTable(table.id)

        });

    },
    renderTheadsTable: async function (id) {
        // Busca lista de  outorgas

        let { recordset } = await SubterraneaModel.list;

        // Captura o primeiro objeto com os valores (key, value)
        let keyValues = Object.entries(recordset[0]);
        // Separa os valores `key` para criar os cabeçalhos (thead)

        let theads = keyValues.map(th => th[0]);

        let maxLengths = maxLengthOfStrings(recordset);

        // Regula largura da coluna  de acordo com o tamanho do tamanho do dado (string)
        let thStyleWidth = maxLengths[0].map(ml => `style="min-width:${ml}em"`);
        //Cria os cabeçalhos (thead)
        $(`#${id}`).find('thead').append(`
              <tr>
              ${theads.map((th, index) => `<th class="bg-gray-200" ${thStyleWidth[index]}>${th}</th>`)}
              </tr>`)

    },
    renderSubterranea: async function () {

        let { recordset } = await SubterraneaModel.list;

        let tbody = $('#list-sub').find('tbody')

        let keysValues = recordset.map(rec => {
            return Object.entries(rec);
        });

        // preenchimento da tbody tag
        keysValues.map(item => {
            tbody.append(
                `
           <tr>
            
      
           ${item.map(item => `
            <td>
                <div class="flex flex-row justify-center">
                <div class="px-4">${item[1]} </div>
                <div class="ml=4 ">
                    <!-- select button -->
                    <button id="btn-selection" class="hover:bg-sky-600 active:bg-sky-700 focus:outline-none focus:ring focus:ring-sky-300">
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
                </div>
            </td>
            
           `)
                }</tr>`
            )
        });

        $('[id^="btn-selection"]').click(function() {
            let parentRow = $(this).closest('tr');
            // Find all td elements within the parent row
            let tds = parentRow.find('td');
            // Convert the DOM element to a jQuery object
            let tdLatitude = $(tds[3]);
            let tdLongitude = $(tds[4]);
            let tdEndereco = $(tds[6]);
            let tdCPFCNPJ = $(tds[7]);
            let tdUsuario = $(tds[8]);
        
            // Get the inner HTML of the div
            let latitude = tdLatitude.find('div.px-4').html();
            let longitude = tdLongitude.find('div.px-4').html();
            let endereco = tdEndereco.find('div.px-4').html();
            let cpfcnpj = tdCPFCNPJ.find('div.px-4').html();
            let usuario = tdUsuario.find('div.px-4').html();

        
        
            let params = {
                latitude: latitude.trim(), 
                longitude: longitude.trim(),
                endereco: endereco,
                cpfcnpj: cpfcnpj, 
                usuario: usuario
            }

            console.log(params)

        });
    }
}

export default ListGrantsView;