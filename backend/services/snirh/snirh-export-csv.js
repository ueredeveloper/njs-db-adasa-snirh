const express = require('express');

const fs = require('fs');
const csv = require('csv-parser');
const papa = require('papaparse');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const axios = require('axios');
const { readFile, readSnirhFile, writeSnirhFile } = require('../../utils/read-write-and-verify-file');

const router = express.Router();

require('dotenv').config();

router.get('/snirh-export-csv', async (req, res) => {

  let { uf, idFinalidade, dataInicio, dataFim, idDominialidade, idTipoOutorga, idSituacaoOutorga, pagina, tamanhoPagina } = req.query;

  // Constructing the URL with parameters
  let url = new URL('https://www.snirh.gov.br/cnarh40_treinamento/rest/api/exportacao/csv');
  url.searchParams.append('uf', uf);
  url.searchParams.append('idFinalidade', idFinalidade);
  url.searchParams.append('dataInicio', dataInicio);
  url.searchParams.append('dataFim', dataFim);
  url.searchParams.append('idDominialidade', idDominialidade);
  url.searchParams.append('idTipoOutorga', idTipoOutorga);
  url.searchParams.append('idSituacaoOutorga', idSituacaoOutorga);
  url.searchParams.append('pagina', pagina);
  url.searchParams.append('tamanhoPagina', tamanhoPagina);

  const { SNIRH_TOKEN } = process.env;

  let response = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': SNIRH_TOKEN,
    }
  })
    .then(response => {
      let text = response.text()
      return text;
    })
    .then(text => {
      //retorna conversão de csv para json.
      return papa.parse(text, {
        header: true,
        delimiter: ";"
      })
    })
    .catch(err => console.log(err));


  readSnirhFile((err, existingData) => {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }

    let { data } = response;

    // retirar último resultado vazio, por causa da conversão csv para json.
    data.pop();

    data.map(d=> existingData.push(d));

    let uniqueItems = {};

    // Iterate through the array
    existingData.forEach(item => {
        // Use INT_CD as the key to check uniqueness
        uniqueItems[item.INT_CD] = item;
    });

    // Convert the unique items object back to an array
    let uniqueArray = Object.values(uniqueItems);

    // Escrita do banco de dados com valores antigos não solicitados e os novos solicitados.
    writeSnirhFile(uniqueArray)

  });


  res.send(response);

});

module.exports = router;


