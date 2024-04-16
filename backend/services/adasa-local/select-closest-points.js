const router = require("express").Router();
const sql = require("mssql");
const mssqlConfig = require('../mssql-config');

const querySelectSubterraneaForInsert = require("../queries/query-select-subterranea-for-insert");
const { querySelectClosestPoints } = require("../queries");
const { query } = require("express");




const { ADASA_DATABASE, ADASA_USERNAME, ADASA_PASSWORD, ADASA_HOST } = process.env;

// configurações do banco
const config = {
    user: ADASA_USERNAME,
    password: ADASA_PASSWORD,
    server: ADASA_HOST,
    database: ADASA_DATABASE,
    trustServerCertificate: true,
};/**
    Captura os ponto mais próximos do ponto selecionado.
*/
router.get("/select-closest-points", async (req, res) => {

    let { latitude, longitude } = req.query;

    sql.connect(config, async function (err) {

        if (err) console.log(err);

        try {

            const request = new sql.Request();
            // Captura os pontos mais próximos.
            let query1 = await querySelectClosestPoints(latitude, longitude);

            let {recordset} = await request.query(query1);
            // Captura as outorgas no modelo da Ana utilizando os ids dos pontos mais próximos.
            let query2 = await querySelectSubterraneaForInsert(recordset.map(c => c.ID_INTERFERENCIA));

            let points = await request.query(query2);

            res.send(points);

            sql.close();

        } catch (err) {
            console.error("Error:", error);
        }

    });// fim sql connect

});

module.exports = router;