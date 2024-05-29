const router = require("express").Router();
const sql = require("mssql");
require('dotenv').config();

const { querySelectByParam } = require("../queries");

const { ADASA_DATABASE, ADASA_USERNAME, ADASA_PASSWORD, ADASA_HOST } = process.env;

// configurações do banco
const config = {
    user: ADASA_USERNAME,
    password: ADASA_PASSWORD,
    server: ADASA_HOST,
    database: ADASA_DATABASE,
    trustServerCertificate: true,
};

/**
    Captura os ponto mais próximos do ponto selecionado.
*/
router.get("/select-by-param", async (req, res) => {

    let { param } = req.query;

    console.log(param)

    sql.connect(config, async function (err) {

        /* 29/05/2024 Está com erro  */

        if (err) console.log(err);

        try {

            const request = new sql.Request();
            // Captura os pontos mais próximos.
            let query = await querySelectByParam(param);

            let recordset  = await request.query(query);

            console.log(recordset)

            res.send('recordset');

            sql.close();

        } catch (err) {
            console.error("Error:", error);
        }

    });// fim sql connect

});

module.exports = router;