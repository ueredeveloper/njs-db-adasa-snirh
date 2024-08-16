
const snirhError = async (params) => {
    let { uf, idArquivoErro } = params;

    // Constructing the URL with parameters
    let url = new URL('http://localhost:3000/services//snirh-process-error?');
    url.searchParams.append('uf', uf);
    url.searchParams.append('idArquivoErro', idArquivoErro);

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
            }
        });

        return response.text();

    } catch (error) {
        console.error('Error:', error);
    }
}

export default snirhError;