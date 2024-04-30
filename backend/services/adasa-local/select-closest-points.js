const router = require("express").Router();
const sql = require("mssql");
const { querySelectClosestPoints, querySelectSuperficiaisForInsert, querySelectSubterraneasForInsert, querySelectSuperficiaisForUpdate } = require("../queries");

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

    let { latitude, longitude, ti } = req.query;

    sql.connect(config, async function (err) {

        if (err) console.log(err);

        try {

            const request = new sql.Request();
            // Captura os pontos mais próximos.
            let query1 = await querySelectClosestPoints(latitude, longitude, ti);

            let { recordset } = await request.query(query1);
            // Captura as outorgas no modelo da Ana utilizando os ids dos pontos mais próximos.

            let query2;

            switch (ti) {
                case "1": query2 = await querySelectSuperficiaisForUpdate(recordset.map(c => c.ID_INTERFERENCIA));
                    break;
                case "2": query2 = await querySelectSubterraneasForInsert(recordset.map(c => c.ID_INTERFERENCIA));
                    break;
                case "3": query2 = await querySelectSubterraneasForInsert(recordset.map(c => c.ID_INTERFERENCIA));
                    break;
                case "5": query2 = await querySelectSubterraneasForInsert(recordset.map(c => c.ID_INTERFERENCIA));
                    break;
                default:
                    console.log('switch defalt ', ti)

            }

            let points = await request.query(query2);

            res.send(points);

            sql.close();

        } catch (err) {
            console.error("Error:", error);
        }

    });// fim sql connect

});

module.exports = router;