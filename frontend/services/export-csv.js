
const exportCsv = async (params) => {


     let {
         uf, idFinalidade, dataInicio, dataFim,
         idDominialidade, idTipoOutorga, idSituacaoOutorga,
         pagina, tamanhoPagina } = params;
 
     // Constructing the URL with parameters
     let url = new URL('http://localhost:3000/services/snirh-export-csv');
     url.searchParams.append('uf', uf);
     url.searchParams.append('idFinalidade', idFinalidade);
     url.searchParams.append('dataInicio', dataInicio);
     url.searchParams.append('dataFim', dataFim);
     url.searchParams.append('idDominialidade', idDominialidade);
     url.searchParams.append('idTipoOutorga', idTipoOutorga);
     url.searchParams.append('idSituacaoOutorga', idSituacaoOutorga);
     url.searchParams.append('pagina', pagina);
     url.searchParams.append('tamanhoPagina', tamanhoPagina);
 
     try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            }
        });

        console.log(data)
        const data = await response.json();

        return data;

    } catch (error) {
        console.error('Error:', error);
        //res.status(500).send('Internal Server Error');
    }


}

export default exportCsv;