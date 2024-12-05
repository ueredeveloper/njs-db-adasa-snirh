let snirhParams = {
    "uf": "DF",
    "dataInicio": "",
    "dataFim": "",
    "idDominialidade": "1",
    "idTipoOutorga": "",
    "idSituacaoOutorga": "",
    "idFinalidade": "",
    "pagina": 1,
    "tamanhoPagina": 200
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
     * Atualiza um atributo da variável.
     * @param {Object} newParams Um objeto com o novo atributo e seu valor.
     */
    setSnirhParams: (newParams) => {
        snirhParams = {...snirhParams, ...newParams};
    }
};