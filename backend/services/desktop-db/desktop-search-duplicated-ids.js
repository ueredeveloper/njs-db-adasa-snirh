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
const fs = require('fs');
const { readSnirhFile } = require('../../utils/read-write-and-verify-file');

const router = express.Router();

let path = './backend/data/json/duplicatedIds.json';

router.get('/desktop-db-search-duplicated-ids', async (req, res) => {

    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo:', err);
            callback(err, null);
            return;
        }
        try {

            const dataArray = JSON.parse(data); // Parseia o conteúdo JSON em um array ou objeto

            // Remove o último registro se estiver vazio (comportamento opcional)
            // if (dataArray.length > 0 && Object.keys(dataArray[dataArray.length - 1]).length === 0) {
            //   dataArray.pop();
            // }
            res.send(dataArray);
        } catch (parseErr) {
            console.error('Erro ao parsear JSON:', parseErr);

        }
    });

});

module.exports = router;
