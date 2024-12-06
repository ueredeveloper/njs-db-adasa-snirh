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

router.post('/desktop-db-search-by-params', async (req, res) => {

    /** @type {object} */
    let params = req.body;

    console.log('desk db search by params ', params)

   /* params = {
        OUT_NU_PROCESSO: stateGrant.EMP_NM_USUARIO,
        OUT_NU_ATO: stateGrant.OUT_NU_ATO,
        EMP_NU_CPFCNPJ: stateGrant.EMP_NU_CPFCNPJ,
        EMP_NM_USUARIO: stateGrant.EMP_NM_USUARIO,
        INT_CD_ORIGEM: stateGrant.INT_CD_ORIGEM
    }
    */

    /*No momento será pesquisado apenas se o id da interferência já está presento no banco desktop, porém
    depois podemos fazer outras pesquisas.*/

    readSnirhFile(async (err, desktopDb) => {
        
        if (err) {
            console.error('Error reading file:', err);
            return;
        }

        // @type {Array<Object>} 
        let results = desktopDb.filter(db => {
            // Checa se existe a propriedade no object e se a busca inclui algo neste objeto.
            return db.INT_CD_ORIGEM && db.INT_CD_ORIGEM === String(params.INT_CD_ORIGEM); 
    
        });
        res.send(results)
    });

});

module.exports = router;
