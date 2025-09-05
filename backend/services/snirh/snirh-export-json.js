const express = require('express');

const fs = require('fs');
const csv = require('csv-parser');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const axios = require('axios');

const router = express.Router();

require('dotenv').config();

router.get('/snirh-export-json', async (req, res) => {

  const { SNIRH_URL, SNIRH_TOKEN} = process.env;

  let { uf, idFinalidade, dataInicio, dataFim, idDominialidade, idTipoOutorga, idSituacaoOutorga, pagina, tamanhoPagina } = req.query;

  // Constructing the URL with parameters
  let url = new URL(`${SNIRH_URL}/rest/api/exportacao/json`);

  console.log('export json ', url)
  url.searchParams.append('uf', uf);
  url.searchParams.append('idFinalidade', idFinalidade);
  url.searchParams.append('dataInicio', dataInicio);
  url.searchParams.append('dataFim', dataFim);
  url.searchParams.append('idDominialidade', idDominialidade);
  url.searchParams.append('idTipoOutorga', idTipoOutorga);
  url.searchParams.append('idSituacaoOutorga', idSituacaoOutorga);
  url.searchParams.append('pagina', pagina);
  url.searchParams.append('tamanhoPagina', tamanhoPagina);

  let response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': SNIRH_TOKEN,
    }
  });
  
  let json = await response.json();

  console.log(json)

  res.send(json)

});
module.exports = router;


