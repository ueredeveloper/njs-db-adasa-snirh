/**
 * @function
 * @description Faz uma solicitação GET para obter os pontos mais próximos ao ponto especificado.
 * @param {number} latitude - A latitude do ponto de referência.
 * @param {number} longitude - A longitude do ponto de referência.
 * @param {string} ti - O tipo de interferência para filtrar os pontos.
 * @returns {Promise<object>} - Uma promessa que resolve com os dados obtidos da resposta em formato JSON.
 * @throws {Error} - Lança um erro se a solicitação falhar ou a resposta não puder ser processada.
 */

const localDbSelectClosestPoints = async (latitude, longitude, ti) => {

    // Constructing the URL with parameters
    let url = new URL('http://localhost:3000/services/select-closest-points');

    // Se a latitude estiver com vírgula, como quando recebe a outorga do arquivo do cnarh, .csv, muda para ponto.
    url.searchParams.append('latitude', latitude.replace(',', '.'));
    url.searchParams.append('longitude', longitude.replace(',', '.'));
    url.searchParams.append('ti', ti);

    try {
        const response = await fetch(url, {
            method: 'GET',
           // redirect: "follow"
        });

        const data = await response.json();

        return data;

    } catch (error) {
        console.error('Error:', error);
    }
}

export default localDbSelectClosestPoints;