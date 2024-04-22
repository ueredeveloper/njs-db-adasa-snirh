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
 * Retorna o tipo de interferência com base nos códigos fornecidos.
 * 
 * @param {number} INT_TIN_CD O código para interferência tipo TIN.
 * @param {number} INT_TSU_CD O código para interferência tipo TSU.
 * @returns {number} O tipo de interferência: 1, 2 ou 3.
 */
const getInterferenceType = (INT_TIN_CD, INT_TSU_CD) => {
    switch ([INT_TIN_CD, INT_TSU_CD].join('')) {
        case "11":
            return 1; // Interferência do tipo 1 (Superficial)
        case "12":
            return 2; // Interferência do tipo 2 (Subterrânea)
        default:
            return 3; // Outro tipo de interferência
    }
}

export { maxLengthOfStrings, createTheadsValues, createLatLngPosition, getInterferenceType }