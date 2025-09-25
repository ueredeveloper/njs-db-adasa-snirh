
const router = require("express").Router();
const sql = require("mssql");
const { querySelectSuperficiaisForUpdate, querySelectSubterraneasForUpdate } = require("../queries");
require('dotenv').config();


const { ADASA_DATABASE, ADASA_USERNAME, ADASA_PASSWORD, ADASA_HOST } = process.env;

// Configuração do banco de dados
const config = {
    user: ADASA_USERNAME,
    password: ADASA_PASSWORD,
    server: ADASA_HOST,
    database: ADASA_DATABASE,
    trustServerCertificate: true,
    // esperar mais pelo resultado
    connectionTimeout: 30000, // 30s
};

router.get("/select-point-by-type-and-id", async (req, res) => {

    let { ti, id } = req.query;

    sql.connect(config, async function (err) {

        if (err) {
            console.log(err);
            return res.status(500).send("Erro de conexão com o banco de dados");
        }

        try {
            const request = new sql.Request();


            // Captura concessões no modelo Ana usando os IDs dos pontos mais próximos.
            let query2;

            switch (ti) {
                case "1":
                    query2 = await querySelectSuperficiaisForUpdate([id]);
                    break;
                case "2":
                    query2 = await querySelectSubterraneasForUpdate([id]);
                    break;
                default:
                    console.log('Tipo de interferência não avaliada no momento: ', ti);
            }

            // Obtém o conjunto de resultados da consulta
            let { recordset: pointsBySNIRHStandard } = await request.query(query2);


            res.send(pointsBySNIRHStandard);

            sql.close();

        } catch (err) {
            console.error("Erro:", err);
            res.status(500).send("Erro ao processar a consulta");
        }

    }); // fim sql.connect

});

module.exports = router;