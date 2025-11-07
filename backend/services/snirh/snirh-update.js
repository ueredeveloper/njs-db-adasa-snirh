const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const FormData = require('form-data');

const { compareAndWriteListGrants } = require('../../utils/compare-and-write-list-grants');

const router = express.Router();
require('dotenv').config();


router.post('/update', async (req, res) => {
  // Chaves de acesso
  const { SNIRH_URL, SNIRH_TOKEN } = process.env;
  // Link de acesso
  let url = `${SNIRH_URL}/rest/api/atualizar?uf=DF`;
  // Json com dois registros (Snirh e Adasa)
  let body = req.body;

  console.log('editando concessões...');

  try {
    const currentTimestamp = new Date().getTime();

    // Compara o json da Adasa com o json do SRINH e gera um json para envio via serviço
    await compareAndWriteListGrants(body, currentTimestamp);

    let filePath = path.join(__dirname, `../../data/csv/to-update-grants-${currentTimestamp}.csv`);

    if (!fs.existsSync(filePath)) {
      return res.status(500).json({ error: 'CSV file was not created.' });
    }

    // Read the CSV file using promises (async/await)
    const data = await fs.promises.readFile(filePath, { encoding: 'utf-8' });

    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: url,
      headers: {
        'Accept': 'application/json',
        // original 'Content-Type': 'text/csv; charset=utf-8',
        "Content-Type": "multipart/form-data; charset=utf-8", // teste 1
        // 'content-type': 'application/octet-stream', // teste 2
        //'Content-Type': 'text/csv; charset=iso-8859-1',
        'Authorization': `Bearer ${SNIRH_TOKEN}`,
      },
      data: data
    };

    // Send request
    const response = await axios.request(config);

    // Send success response
    res.json(response.data);

  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;