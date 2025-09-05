const express = require('express');

const fs = require('fs');
const csv = require('csv-parser');

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const axios = require('axios');
const { readFile, readSnirhFile, writeSnirhFile } = require('../../utils/read-write-and-verify-file');

const router = express.Router();

require('dotenv').config();
const iconv = require('iconv-lite');
const papa = require('papaparse');

router.get('/snirh-export-csv', async (req, res) => {
  const { SNIRH_URL, SNIRH_TOKEN } = process.env;

  let { uf, idFinalidade, dataInicio, dataFim, idDominialidade, idTipoOutorga, idSituacaoOutorga, pagina, tamanhoPagina } = req.query;
  let url = new URL(`${SNIRH_URL}/rest/api/exportacao/csv`);

  url.searchParams.append('uf', uf);
  url.searchParams.append('idFinalidade', idFinalidade);
  url.searchParams.append('dataInicio', dataInicio);
  url.searchParams.append('dataFim', dataFim);
  url.searchParams.append('idDominialidade', idDominialidade);
  url.searchParams.append('idTipoOutorga', idTipoOutorga);
  url.searchParams.append('idSituacaoOutorga', idSituacaoOutorga);
  url.searchParams.append('pagina', pagina);
  url.searchParams.append('tamanhoPagina', tamanhoPagina);

  try {
    let response = await fetch(url, {
      method: 'GET',
      headers: { 'Authorization': SNIRH_TOKEN },
    });

    // Ler como buffer
    let buffer = await response.arrayBuffer();
    let csvText = iconv.decode(Buffer.from(buffer), 'latin1'); // ou 'win1252' dependendo do arquivo

    // Converter CSV para JSON
    let parsed = papa.parse(csvText, {
      header: true,
      delimiter: ";"
    });

    // Integrar com arquivo existente
    readSnirhFile((err, existingData) => {
      if (err) {
        console.error('Error reading file:', err);
        return;
      }

      let { data } = parsed;
      data.pop(); // remover último vazio
      data.forEach(d => existingData.push(d));

      let uniqueItems = {};
      existingData.forEach(item => { uniqueItems[item.INT_CD] = item; });
      let uniqueArray = Object.values(uniqueItems);

      writeSnirhFile(uniqueArray);
    });

    res.send(parsed);

  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Erro ao buscar CSV SNIRH' });
  }
});


module.exports = router;


