/**
 * Realiza uma busca no banco de dados local pelo id da interferência na Adasa (INT_CD_ORIGEM).
 * 
 * @async
 * @function desktopDbSearchByKeyword
 * @param {string} search - O termo de busca para procurar no banco de dados local.
 * @returns {Promise<Object>} Os dados retornados pela requisição em formato JSON.
 * @throws {Error} Lança um erro se a requisição falhar.
 */

const desktopDBSearchPointById = async (idInterference) => {

    // Constructing the URL with parameters
    let url = new URL('http://localhost:3000/services/desktop-db-search-by-id-interference');
    url.searchParams.append('idInterference', idInterference);

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

export default desktopDBSearchPointById;