const express = require('express');
const { readSnirhFile } = require('../../utils/read-write-and-verify-file');

const router = express.Router();

router.get('/select-desktop-db', async (req, res) => {

    let { search } = req.query;

    readSnirhFile(async (err, localDB) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }

        let files = await localDB;

        let results = files.filter(db => {
            // Checa se existe a propriedade no object e se a busca inclui algo neste objeto.
            return (db.INT_CD && db.INT_CD.includes(search)) ||
                (db.EMP_NM_EMPREENDIMENTO && db.EMP_NM_EMPREENDIMENTO.includes(search)) ||
                (db.EMP_NM_USUARIO && db.EMP_NM_USUARIO.includes(search)) ||
                (db.EMP_NU_CPFCNPJ && db.EMP_NU_CPFCNPJ.includes(search)) ||
                (db.OUT_NU_PROCESSO && db.OUT_NU_PROCESSO.includes(search)) ||
                (db[''] && db[''].includes(search));
        });

        res.send(results)

    });

});
module.exports = router;


