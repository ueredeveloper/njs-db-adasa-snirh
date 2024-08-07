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

  compareAndWriteCsvToUpdate(body.federalGrant, body.stateGrant);

  // CACILDO 928961 CAPTAÇÃO OUTORGADO CRIAÇÃO DE ANIMAIS MUDAR 2023 PARA 2028
  let id = body.stateGrant.INT_CD_ORIGEM;
  let file = `././backend/data/csv/${id}.csv`;

  // ler o arquivo csv
  let readStream = fs.createReadStream(file);

  // Enviar o arquivo csv
  fetch(url, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data',
      'Authorization': SNIRH_TOKEN,
    },
    body: readStream
  }).then((response) => {
    return response.json()
  }).then((response) => {
    res.send(response)
  });
});

module.exports = router;