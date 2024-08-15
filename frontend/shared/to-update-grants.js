/**
 * Lista de outorgas que precisam ser atualizadas no sistema SNRIH.
 * @type {Array}
 */
let toUpdateGrants = [];

/**
 * Módulo responsável por gerenciar a lista de outorgas a serem atualizadas.
 * @module
 */
export default {
    /**
     * Obtém a lista atual de outorgas a serem atualizadas.
     * @returns {Array} A lista de outorgas.
     */
    getToUpdateGrants: () => {
        return toUpdateGrants;
    },
    /**
     * Define uma nova lista de outorgas a serem atualizadas.
     * @param {Array} newGrants A nova lista de outorgas.
     */
    setToUpdateGrants: (newGrants) => {
        toUpdateGrants = newGrants;
    }
};