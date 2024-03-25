const router = require("express").Router();
const sql = require("mssql");
const mssqlConfig = require('../mssql-config');
const queryClorestPoints = require("../queries/query-closest-points");



const { ADASA_DATABASE, ADASA_USERNAME, ADASA_PASSWORD, ADASA_HOST } = process.env;

// configurações do banco
const config = {
    user: ADASA_USERNAME,
    password: ADASA_PASSWORD,
    server: ADASA_HOST,
    database: ADASA_DATABASE,
    trustServerCertificate: true,
};


// simple movie average
router.get("/select-closest-points", async (req, res) => {

    let { latitude, longitude } = req.query;

    console.log(latitude, longitude)

    sql.connect(config, function (err) {

        if (err) console.log(err);

        let query = queryClorestPoints(latitude, longitude);

        // criar requirisão
        var request = new sql.Request();

        request.query(query, async function (err, recordset) {
            if (err) console.log(err);

            res.send(recordset)

        }); // fim request

    });// fim sql connect


    //res.send("fetch subterraneo - services running");
});

module.exports = router;