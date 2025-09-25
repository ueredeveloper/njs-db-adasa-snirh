/**
 * Endpoint para selecionar dados do banco de dados local do desktop.
 * @async
 * @function
 * @name selectDesktopDB
 * @memberof module:routes/desktop
 * @param {Object} req - Objeto de solicitação express.
 * @param {Object} res - Objeto de resposta express.
 * @returns {Promise<void>} Retorna uma promessa vazia.
 */

const express = require('express');
const { readSnirhFile } = require('../../utils/read-write-and-verify-file');

const router = express.Router();

router.get('/desktop-db-search-duplicated-ids', async (req, res) => {

    readSnirhFile(async (err, desktopDb) => {

        if (err) {
            console.error('Error reading file:', err);
            return;
        }

        /** @type {Array<Object>} */
        let results = desktopDb.filter(
            // Busca valores duplicados pelo id da interferência na Adasa (INT_CD_ORIGEM)
            (objeto, indice, arr) => {
                if (objeto.INT_CD_ORIGEM !== "") {
                    return arr.findIndex(obj => obj.INT_CD_ORIGEM === objeto.INT_CD_ORIGEM) !== indice
                }

            }
        );

        res.send(results)

    });

});

module.exports = router;
