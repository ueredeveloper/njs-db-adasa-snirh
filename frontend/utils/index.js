
const maxLengthOfStrings = (array) => {

    let maxLengths = array.map(record => {
        let max_lengths = [];

        // Find the maximum length between key and value when converted to string
        for (const [key, value] of Object.entries(record)) {
            // Verifica se valor null e depois insere tamanho da string na array (max_lengths)
            max_lengths.push(Math.max(key.length, value === null ? 0 : value.toString().length));
        }
        return max_lengths;
    });
    return maxLengths;
}

const createTheadsValues = async (list) => {

    // Captura o primeiro objeto com os valores (key, value)
    let keyValues = Object.entries(await list[0]);
    // Separa os valores `key` para criar os cabeçalhos (thead)

    let theads = keyValues.map(th => th[0]);
    // Adiciona coluna a mais para  os botões
    theads.push(``);

    return theads;

};


const createLatLngPosition = (latitude, longitude) => {

    // Converte o valor para float e muda vígula para  ponto.
    let position = { lat: parseFloat(latitude.replace(/,/g, '.')), lng: parseFloat(longitude.replace(/,/g, '.')) }
    return position;

};
/**
 * Captura dois tipos de latitude e longitude de acordo com os atributos do objeto enviado.
 * @param {Object} grant - Objeto contendo os atributos de latitude e longitude.
 * @returns {Object} - Objeto contendo as coordenadas latitude e longitude.
 */
const getLatLng = (grant) => {
    let latLng;
    if (grant.INT_CR_LATITUDE) {
        latLng = {
            lat: grant.INT_CR_LATITUDE,
            lng: grant.INT_CR_LONGITUDE
        }
    } else {
        latLng = {
            lat: grant.INT_NU_LATITUDE,
            lng: grant.INT_NU_LONGITUDE
        }
    }
    return latLng;
}

/**
 * Retorna o tipo de interferência com base nos códigos fornecidos.
 * 
 * @param {number} INT_TIN_CD O código para interferência tipo TIN.
 * @param {number} INT_TSU_CD O código para interferência tipo TSU.
 * @returns {number} O tipo de interferência: 1, 2 ou 3.
 */
const getInterferenceType = (INT_TIN_CD, INT_TSU_CD) => {

    /* 
    this.tables = [
            { class: 'list-snirh', id: 'list-snirh-sub', tipo: '1', subtipo: '2' },
            { class: 'list-snirh hidden', id: 'list-snirh-sup', tipo: '1', subtipo: '1' },
            { class: 'list-snirh hidden', id: 'list-snirh-lan', tipo: '2', subtipo: '1' },
            { class: 'list-snirh hidden', id: 'list-snirh-bar', tipo: '3', subtipo: '1' }
        ];
        */

    /*
     Tabela tipo interferência
        1 - Superficial;
        2 - Subterrânea
        3 - Lançamento de Águas Pluviais
        4 - Lançamento de Efluentes
        5 - Barragem
        6 - Caminhão Pipa
        
        */

    switch ([INT_TIN_CD, INT_TSU_CD].join('')) {
        case "11":
            return 1; // Interferência do tipo 1 (Superficial)
        case "12":
            return 2; // Interferência do tipo 2 (Subterrânea)
        case "21":
            return 3; // Interferência do tipo 3 (Lançamento)
        case "31":
            return 5; // Interferência do tipo 5 (Barragem)
        default:
            return null; // Outro tipo de interferência
    }
}


/**
 * Converte todos os valores de um objeto ou array para strings.
 *
 * @param {Object|Array} obj - O objeto ou array de entrada cujos valores devem ser convertidos para strings.
 * @returns {Object|Array|string} - Um novo objeto ou array com todos os valores convertidos para strings,
 *                                  ou o próprio valor de entrada como string, caso não seja um objeto nem um array.
 *
 * @example
 * // Exemplo de uso com um objeto:
 * const entrada = INT_TIN_CD: 1 
 * const resultado = convertValuesToString(entrada);
 * console.log(resultado); INT_TIN_CD: '1'
 
 */
function convertValuesToString(obj) {
    if (Array.isArray(obj)) {
        return obj.map(convertValuesToString);
    } else if (typeof obj === 'object' && obj !== null) {
        return Object.fromEntries(
            Object.entries(obj).map(([key, value]) => [key, convertValuesToString(value)])
        );
    }
    return String(obj); // Convert all non-object, non-array values to strings
}





export { maxLengthOfStrings, createTheadsValues, createLatLngPosition, getInterferenceType, getLatLng, convertValuesToString }