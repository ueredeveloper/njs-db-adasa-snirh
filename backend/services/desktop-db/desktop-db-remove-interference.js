/**
 * Endpoint para remover uma interferência do banco desktop db.
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
const { readSnirhFile, writeSnirhFile } = require('../../utils/read-write-and-verify-file');

const router = express.Router();

let path = './backend/data/json/exportacao_cnarh40_DF.json';

router.get('/desktop-db-remove-interference', async (req, res) => {

    /** @type {string} */
    let { INT_CD, INT_CD_ORIGEM } = req.query;

    readSnirhFile(async (err, desktopDb) => {

        if (err) {
            console.error('Error reading file:', err);
            return;
        }

        /** @type {Array<Object>} */
        let jsonData = desktopDb.filter(item => {
            // A condição de negação é o que decide se o item será mantido ou removido.
            // O item só é mantido se a negação da sua condição for verdadeira.
            const isMatch = item.INT_CD_ORIGEM === INT_CD_ORIGEM && item.INT_CD === INT_CD;

            // Retorna 'true' para manter o item, e 'false' para removê-lo.
            return !isMatch;
        });


        try {
            fs.writeFile(path, JSON.stringify(jsonData), { encoding: 'utf-8' }, (err) => {
                if (err) {
                    console.error('Remoção de interferência: Erro ao reescrever o arquivo:', err);
                    throw err;
                }
                //console.log('Arquivo SNIRH salvo no formato UTF-8 com sucesso.');
            });
        } catch (err) {
            console.error('Erro inesperado ao reescrever o arquivo:', err);
            res.send('Remoção de interferência: Erro ao reescrever o arquivo.')
        }




    });

    res.send('Interferência removida')

});

module.exports = router;
