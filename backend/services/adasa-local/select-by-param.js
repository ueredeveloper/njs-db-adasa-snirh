const router = require("express").Router();
const sql = require("mssql");
require('dotenv').config();

const { querySelectByParam, querySelectSuperficiaisForInsert, querySelectSubterraneasForInsert } = require("../queries");
const { all } = require("axios");

const { ADASA_DATABASE, ADASA_USERNAME, ADASA_PASSWORD, ADASA_HOST } = process.env;

// configurações do banco
const config = {
    user: ADASA_USERNAME,
    password: ADASA_PASSWORD,
    server: ADASA_HOST,
    database: ADASA_DATABASE,
    trustServerCertificate: true,
};

router.get('/select-by-param', function (req, res) {
    // mudar para post e assim enviar um polígono para o servidor repl.it

    let { param } = req.query;

    //conexão com o banco
    sql.connect(config, function (err) {

        if (err) console.log(err);

        // criar requirisão
        var request = new sql.Request();
        // polígono  que ser enviado no body
        let query = querySelectByParam(param);

        // requisição
        request.query(query, async function (err, recordset) {

            if (err) console.log(err)

            /* Retorno se não escontrar nada: 

            {
                recordsets: [ [] ],
                recordset: [],
                output: {},
                rowsAffected: [ 1, 0 ]
            }
            */

            let grants = recordset.recordset;

            console.log('Adasa Local: quantidades de outorgas -> ', grants.length)
            // Se encontrar algum resultado pelos parâmetros
            if (grants.length > 0) {

                let allGrants = []

                let supIds = grants.filter(item => item.ID_TIPO_INTERFERENCIA === 1).map(item => item.ID_INTERFERENCIA);
                // Somente busca se houver id para buscar. A expressão in do sql exige pelo menos um id.
                if (supIds.length > 0) {

                    // Captura interferências pelos ids das interferências
                    let supQuery = await querySelectSuperficiaisForInsert(supIds);
                    // Busca os resultados por uma sql query
                    let supPoints = await request.query(supQuery);
                    // Push com operador spread que não deixa criar array dentro de array. Ex: [[1, 2, 3]] => [1, 2, 3].
                    allGrants.push(...supPoints.recordset)

                }

                let subIds = grants.filter(item => item.ID_TIPO_INTERFERENCIA === 2).map(item => item.ID_INTERFERENCIA)

                // Somente busca se houver id para buscar. A expressão in do sql exige pelo menos um id.
                if (subIds.length > 0) {

                    // Captura interferências pelos ids das interferências
                    let subQuery = await querySelectSubterraneasForInsert(subIds);
                    // Busca os resultados por uma sql query
                    let subPoints = await request.query(subQuery);

                    allGrants.push(...subPoints.recordset)

                }

                console.log('Adasa Local: search by param, quantidade -> ', allGrants.length)

                res.send(allGrants);
            } else {
                res.send([])
            }
        });
    });
});

module.exports = router;