const router = require("express").Router();
const sql = require("mssql");
const mssqlConfig = require('../mssql-config');
const queryInsertSubterranea = require("../queries/query-insert-subterranea");



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
router.get("/select-subterraneas", async (req, res) => {

    let ids = [1,2,3,4,5]

    sql.connect(config, function (err) {

        if (err) console.log(err);

        let query = queryInsertSubterranea();

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