const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const FormData = require('form-data');

const { compareAndWriteListGrants } = require('../../utils/compare-and-write-list-grants');

const router = express.Router();
require('dotenv').config();


router.post('/update', async (req, res) =>  {
  const { SNIRH_URL, SNIRH_TOKEN } = process.env;
  let url = `${SNIRH_URL}/rest/api/atualizar?uf=DF`;

  console.log('Insert Request to:', url);

  let body = req.body;

  try {
    const currentTimestamp = new Date().getTime();

    // Generate CSV file
    await compareAndWriteListGrants(body, currentTimestamp);

    let filePath = path.join(__dirname, `../../data/csv/to-update-grants-${currentTimestamp}.csv`);
    console.log('CSV File Path:', filePath);

    if (!fs.existsSync(filePath)) {
      return res.status(500).json({ error: 'CSV file was not created.' });
    }

    // Read the CSV file using promises (async/await)
    const data = await fs.promises.readFile(filePath, 'utf8');

    let config = {
      method: 'put',
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