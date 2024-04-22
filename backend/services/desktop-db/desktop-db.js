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

router.get('/select-desktop-db', async (req, res) => {

    /** @type {string} */
    let { search } = req.query;

    readSnirhFile(async (err, localDB) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }

        /** @type {Array<Object>} */
        let files = await localDB;

        /** @type {string} */
        let _search = search.toLocaleLowerCase();
    
        /** @type {Array<Object>} */
        let results = files.filter(db => {
            // Checa se existe a propriedade no object e se a busca inclui algo neste objeto.
            return (db.INT_CD && db.INT_CD.includes(_search)) ||
                (db.EMP_NM_EMPREENDIMENTO && db.EMP_NM_EMPREENDIMENTO.toLowerCase().includes(_search)) ||
                (db.EMP_NM_USUARIO && db.EMP_NM_USUARIO.toLowerCase().includes(_search)) ||
                (db.EMP_NU_CPFCNPJ && db.EMP_NU_CPFCNPJ.toLowerCase().includes(_search)) ||
                (db.OUT_NU_PROCESSO && db.OUT_NU_PROCESSO.toLowerCase().includes(_search)) ||
                (db[''] && db[''].includes(_search));
        });

        res.send(results)

    });

});

module.exports = router;
