const express = require('express');
const fs = require('fs');
const { compareAndWriteListOfStateForInsert } = require('../../utils/compare-and-write-list-fo-state-for-insert');

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const router = express.Router();
require('dotenv').config();

router.post('/inserir', async (req, res) => {

  let url = "https://www.snirh.gov.br/cnarh40_treinamento/rest/api/inserir?uf=DF";
  let SNIRH_TOKEN = process.env['SNIRH_TOKEN'];
  //let file = './csv/teste-1-superficial-welber.csv';

  let body = req.body;
  //const readStream = fs.createReadStream(file);

  try {

    const currentTimestamp = new Date().getTime();

    // Espera a criação do arquivo CSV
    await compareAndWriteListOfStateForInsert(body, currentTimestamp);

    let file = `./backend/data/csv/to-insert-grants-${currentTimestamp}.csv`;

    // Verifica se o arquivo foi criado
    if (fs.existsSync(file)) {

      // Ler o arquivo CSV
      let readStream = fs.createReadStream(file);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json; charset=utf-8',
          'Content-Type': 'text/csv; charset=utf-8',
          'Authorization': 'Bearer ' + SNIRH_TOKEN,
        },
        body: readStream,
        redirect: 'manual', // Disable automatic redirect following
      });

      // Handle redirect
      if (response.status === 301 || response.status === 302) {

        const redirectUrl = response.headers.get('Location');
        if (!redirectUrl) {
          throw new Error('Redirect location not found');
        }

        // Make a new request to the redirected URL
        const redirectedResponse = await fetch(redirectUrl, {
          method: 'POST',
          headers: {
            'Accept': 'application/json; charset=utf-8',
            'Content-Type': 'text/csv; charset=utf-8',
            'Authorization': 'Bearer ' + SNIRH_TOKEN,
          },
          body: readStream,
        });

        const data = await redirectedResponse.json();
        res.send(data);
      } else if (!response.ok) {

        const data = await response.json();
        res.send(data);
        // Handle the error response here
      } else {
        const data = await response.json();

        res.send(data);
      }

    } else {
      res.status(500).send({ error: 'CSV file was not created.' });
    }

  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }

});


module.exports = router;