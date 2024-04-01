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
};


// simple movie average
router.get("/select-closest-points", async (req, res) => {

    let { latitude, longitude } = req.query;

    console.log(latitude, longitude);

    let closestPoints;

    sql.connect(config, async function (err) {

        if (err) console.log(err);

        let query1 = await querySelectClosestPoints(latitude, longitude);

        console.log(query1)
        // criar requirisão
        var request = new sql.Request();

       

        request.query(query1, async function (err, recordset) {
            if (err) console.log(err);

            //res.send(recordset)
            console.log(recordset)
            closestPoints = await recordset;

        });

       

      //  let query2 = querySelectSubterraneaForInsert()
        
       /* request.query(query, async function (err, recordset) {
            if (err) console.log(err);

            //res.send(recordset)
            closestPoints = await recordset;

            querySelectSubterraneaForInsert()

        });*/

    });// fim sql connect

    console.log(closestPoints)


    //res.send("fetch subterraneo - services running");
});

module.exports = router;