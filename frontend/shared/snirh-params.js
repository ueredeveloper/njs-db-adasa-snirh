let snirhParams = {
    "uf": "DF",
    "dataInicio": "20150101000000",
    "dataFim": "20210101000000",
    "idDominialidade": "1",
    "idTipoOutorga": "",
    "idSituacaoOutorga": "",
    "idFinalidade": "5",
    "pagina": 1,
    "tamanhoPagina": 100
}

export default {
    /**
     * Obtém parâmetros de busca do serviço SNIRH
     * @returns {Object} A lista de outorgas.
     */
    getSnirhParams: () => {
        return snirhParams;
    },
    /**
     * Define novos parâmetros de busca no serviço SNIRH.
     * @param {Object} newParams A nova lista de outorgas.
     */
    setSnirhParams: (newParams) => {
        snirhParams = newParams;
    }
};