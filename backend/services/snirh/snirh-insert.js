const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
require('dotenv').config();

const { compareAndWriteListOfStateForInsert } = require('../../utils/compare-and-write-list-fo-state-for-insert');

const router = express.Router();

/*router.post('/inserir', async (req, res) => {

  const { SNIRH_URL, SNIRH_TOKEN} = process.env;

  let url = `${SNIRH_URL}/rest/api/inserir?uf=DF`;

  console.log('insert ', url)

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

});*/


router.post('/inserir', async (req, res) => {
  const { SNIRH_URL, SNIRH_TOKEN } = process.env;
  let url = `${SNIRH_URL}/rest/api/inserir?uf=DF`;

  console.log('Insert Request to:', url);

  let body = req.body;

  try {
    const currentTimestamp = new Date().getTime();

    // Generate CSV file
    await compareAndWriteListOfStateForInsert(body, currentTimestamp);

    let filePath = path.join(__dirname, `../../data/csv/to-insert-grants-${currentTimestamp}.csv`);
    console.log('CSV File Path:', filePath);

    if (!fs.existsSync(filePath)) {
      return res.status(500).json({ error: 'CSV file was not created.' });
    }

    // Read the CSV file using promises (async/await)
    const data = await fs.promises.readFile(filePath, 'utf8');

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: url,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'text/csv',
        'Authorization': `Bearer ${SNIRH_TOKEN}`,
      },
      data: data
    };

    // Send request
    const response = await axios.request(config);
    console.log('Response:', JSON.stringify(response.data));

    // Send success response
    res.json(response.data);

  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;