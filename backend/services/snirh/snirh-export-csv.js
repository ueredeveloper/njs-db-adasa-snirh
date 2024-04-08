const express = require('express');

const fs = require('fs');
const csv = require('csv-parser');
const papa = require('papaparse');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const axios = require('axios');

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
    })})
    .catch(err => console.log(err));


  res.send(response);

});
module.exports = router;


