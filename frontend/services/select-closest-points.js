/**
 * @function
 * @description Faz uma solicitação GET para obter os pontos mais próximos ao ponto especificado.
 * @param {number} latitude - A latitude do ponto de referência.
 * @param {number} longitude - A longitude do ponto de referência.
 * @param {string} ti - O tipo de interferência para filtrar os pontos.
 * @returns {Promise<object>} - Uma promessa que resolve com os dados obtidos da resposta em formato JSON.
 * @throws {Error} - Lança um erro se a solicitação falhar ou a resposta não puder ser processada.
 */

const selectClosestPoints = async (latitude, longitude, ti) => {

    // Constructing the URL with parameters
    let url = new URL('http://localhost:3000/services/select-closest-points');
    url.searchParams.append('latitude', latitude);
    url.searchParams.append('longitude', longitude);
    url.searchParams.append('ti', ti);

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            }
        });

        const data = await response.json();

        return data;

    } catch (error) {
        console.error('Error:', error);
    }
}

export default selectClosestPoints;