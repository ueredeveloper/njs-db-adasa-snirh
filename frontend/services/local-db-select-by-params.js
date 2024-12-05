/**
 * Realiza uma busca no banco de dados local em formato JSON com os dados do SNIRH.
 * 
 * Esta função constrói uma URL com os parâmetros fornecidos e realiza uma requisição GET
 * para o serviço `/services/select-desktop-db`. Os dados são retornados em formato JSON.
 * 
 * Como o sistema SNIRH não tem pesquisas por nome, processo etc, criei um banco em JSON que permite
 * a busca por estes atributos.
 * 
 * @async
 * @function desktopDbSearchByParams
 * @param {string} search - O termo de busca para procurar no banco de dados local.
 * @returns {Promise<Object>} Os dados retornados pela requisição em formato JSON.
 * @throws {Error} Lança um erro se a requisição falhar.
 */

const localDbSelectByParams = async (param) => {

    // Constructing the URL with parameters
    let url = new URL('http://localhost:3000/services/select-by-param');
    url.searchParams.append('param', param);

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

export default localDbSelectByParams;