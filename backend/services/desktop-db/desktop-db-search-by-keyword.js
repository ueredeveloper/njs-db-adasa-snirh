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

router.get('/desktop-db-search-by-keyword', async (req, res) => {

    /** @type {string} */
    let { keyword } = req.query;

    readSnirhFile(async (err, desktopDb) => {
        
        if (err) {
            console.error('Error reading file:', err);
            return;
        }

        /** @type {string} */
        let _keyword = keyword.toLocaleLowerCase();

        /** @type {Array<Object>} */
        let results = desktopDb.filter(db => {
            // Checa se existe a propriedade no object e se a busca inclui algo neste objeto.
            return (db.INT_CD && db.INT_CD.includes(_keyword)) ||
                (db.EMP_NM_EMPREENDIMENTO && db.EMP_NM_EMPREENDIMENTO.toLowerCase().includes(_keyword)) ||
                (db.EMP_NM_USUARIO && db.EMP_NM_USUARIO.toLowerCase().includes(_keyword)) ||
                (db.EMP_NU_CPFCNPJ && db.EMP_NU_CPFCNPJ.toLowerCase().includes(_keyword)) ||
                (db.OUT_NU_PROCESSO && db.OUT_NU_PROCESSO.toLowerCase().includes(_keyword)) ||
                (db.EMP_NM_RESPONSAVEL && db.EMP_NM_RESPONSAVEL.toLowerCase().includes(_keyword)) ||
                // Id da interferência estadual
                (db.INT_CD_ORIGEM && db.INT_CD_ORIGEM.toLowerCase().includes(_keyword)) ||
                
                (db[''] && db[''].includes(_keyword));
        });

        res.send(results)

    });

});

module.exports = router;
