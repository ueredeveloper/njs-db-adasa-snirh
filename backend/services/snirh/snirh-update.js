const express = require('express');
const { compareAndWriteCsvToUpdate } = require('../../utils/compare-and-write-csv-to-update');
const fs = require('fs');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const router = express.Router();
require('dotenv').config();


router.post('/update', async (req, res) => {
  let url = "https://www.snirh.gov.br/cnarh40_treinamento/rest/api/atualizar?uf=DF";
  let SNIRH_TOKEN = process.env['SNIRH_TOKEN'];
  let body = req.body;

  let id = body.stateGrant.INT_CD_ORIGEM;
  let file = `./backend/data/csv/${id}.csv`;

  try {
    // Espera a criação do arquivo CSV
    await compareAndWriteCsvToUpdate(body.federalGrant, body.stateGrant);

    // Verifica se o arquivo foi criado
    if (fs.existsSync(file)) {
      // Ler o arquivo CSV
      let readStream = fs.createReadStream(file);

      // Enviar o arquivo CSV
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
          'Authorization': SNIRH_TOKEN,
        },
        body: readStream
      });

      const responseData = await response.json();
      res.send(responseData);
    } else {
      res.status(500).send({ error: 'CSV file was not created.' });
    }
  } catch (error) {
    res.status(500).send({ error: 'An error occurred during the update process.' });
  }
});

module.exports = router;