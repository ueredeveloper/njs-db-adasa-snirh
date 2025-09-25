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

router.get('/desktop-db-search-by-id-interference', async (req, res) => {

    /** @type {string} */
    let { idInterference } = req.query;

    readSnirhFile(async (err, desktopDb) => {

        if (err) {
            console.error('Error reading file:', err);
            return;
        }

        /** @type {Array<Object>} */
        let results = desktopDb.filter(item => 
            // Checa se existe a propriedade no object e se a busca inclui algo neste objeto.
            item.INT_CD_ORIGEM === idInterference
        );

        res.send(results)

    });

});

module.exports = router;
