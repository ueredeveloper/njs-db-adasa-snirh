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
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        'Authorization': SNIRH_TOKEN,
      }
    })
      .then(async (response) => {
        // Se o arquivo estiver bem salvo, virá um utf-8.
        let text = response.text()

        return text;
      })
      .then(text => {

        // Converte de ISO-8859-1 para UTF-8
        let utf8Text = iconv.decode(Buffer.from(text, 'binary'), 'utf-8');

        //retorna conversão de csv para json.
        return papa.parse(utf8Text, {
          header: true,
          delimiter: ";"
        })
      })
      .catch(err => console.log(err));


    // Integrar com arquivo existente
    readSnirhFile((err, oldData) => {
      if (err) {
        console.error('Error reading file:', err);
        return;
      }

      let { data: newData } = response;

      newData.pop(); // remover último vazio

      // Verifica se o valor já existe e, se não, adiciona..
      newData.forEach(nd => {
        oldData = oldData.filter(od => {
          // Sempre compara INT_CD
          if (od.INT_CD === nd.INT_CD) return false

          // Só compara INT_CD_ORIGEM se não for vazio
          if (od.INT_CD_ORIGEM && od.INT_CD_ORIGEM === nd.INT_CD_ORIGEM) return false

          return true
        })

        oldData.push(nd)
      })
      // C:\Users\fabricio.barrozo\Desktop\workspace\njs-db-adasa-snirh\backend\data\json\exportacao_cnarh40_DF.json
      let path = './backend/data/json/exportacao_cnarh40_DF.json';

      try {
        fs.writeFile(path, JSON.stringify(oldData), { encoding: 'utf-8' }, (err) => {
          if (err) {
            console.error('Erro ao escrever o arquivo:', err);
            throw err;
          }
          console.log('Arquivo SNIRH salvo no formato UTF-8 com sucesso.');
        });
      } catch (err) {
        console.error('Erro inesperado:', err);
      }

    });

    res.send(response);

  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Erro ao buscar CSV SNIRH' });
  }
});

module.exports = router;


