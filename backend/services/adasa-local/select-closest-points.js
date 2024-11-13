const router = require("express").Router();
const sql = require("mssql");
require('dotenv').config();
const { querySelectClosestPoints, querySelectSuperficiaisForInsert,
    querySelectSubterraneasForInsert, querySelectSuperficiaisForUpdate,
    querySelectSubterraneasForUpdate } = require("../queries");

const { ADASA_DATABASE, ADASA_USERNAME, ADASA_PASSWORD, ADASA_HOST } = process.env;

// Configuração do banco de dados
const config = {
    user: ADASA_USERNAME,
    password: ADASA_PASSWORD,
    server: ADASA_HOST,
    database: ADASA_DATABASE,
    trustServerCertificate: true,
};

/**
 * @function
 * @description Captura os pontos mais próximos ao ponto selecionado e recupera as concessões associadas.
 * @name GET /select-closest-points
 * @param {object} req - O objeto de solicitação contendo parâmetros de consulta.
 * @param {object} res - O objeto de resposta usado para enviar o resultado.
 * @async
 * @throws Lança um erro se a conexão com o SQL ou a consulta falhar.
 */
router.get("/select-closest-points", async (req, res) => {

    let { latitude, longitude, ti } = req.query;

    sql.connect(config, async function (err) {

        if (err) {
            console.log(err);
            return res.status(500).send("Erro de conexão com o banco de dados");
        }

        try {
            const request = new sql.Request();

            // Captura os pontos mais próximos.
            let query1 = await querySelectClosestPoints(latitude, longitude, ti);
            let { recordset: pointsByProximity } = await request.query(query1);

            // Captura concessões no modelo Ana usando os IDs dos pontos mais próximos.
            let query2;

            switch (ti) {
                case "1":
                    query2 = await querySelectSuperficiaisForUpdate(pointsByProximity.map(c => c.ID_INTERFERENCIA));
                    break;
                case "2":
                    query2 = await querySelectSubterraneasForUpdate(pointsByProximity.map(c => c.ID_INTERFERENCIA));
                    break;
                default:
                    console.log('Tipo de interferência não avaliada no momento: ', ti);
            }

            // Obtém o conjunto de resultados da consulta
            let { recordset: pointsBySNIRHStandard } = await request.query(query2);

            // Adiciona a distância entre os pontos para comparação no frontend. Esse valor não é utilizado no SNIRH.
            for (let x of pointsBySNIRHStandard) {
                // Encontra o item correspondente em pointsByProximity com o INT_CD_ORIGEM igual
                let matchingItem = pointsByProximity.find(item => item.ID_INTERFERENCIA === x.INT_CD_ORIGEM);

                if (matchingItem) {
                    x.DISTANCE = matchingItem.DISTANCE; // Define a propriedade DISTANCE se uma correspondência for encontrada
                }
            }

            res.send(pointsBySNIRHStandard);

            sql.close();

        } catch (err) {
            console.error("Erro:", err);
            res.status(500).send("Erro ao processar a consulta");
        }

    }); // fim sql.connect

});

module.exports = router;
