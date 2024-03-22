const router = require("express").Router();
const sql = require("mssql");
const mssqlConfig = require('../mssql-config');
const queryInsertSuperficial = require("../queries/query-insert-superficial");


const { ADASA_DATABASE, ADASA_USERNAME, ADASA_PASSWORD, ADASA_HOST, SUPABASE_URL, SUPABASE_KEY } = process.env;

// configurações do banco
const config = {
    user: ADASA_USERNAME,
    password: ADASA_PASSWORD,
    server: ADASA_HOST,
    database: ADASA_DATABASE,
    trustServerCertificate: true,
};


// simple movie average
router.post("/select-superficiais", async (req, res) => {

    let {ids} = req.body;

    sql.connect(config, function (err) {

        if (err) console.log(err);

        let query = queryInsertSuperficial(ids)

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