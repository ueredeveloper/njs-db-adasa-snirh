const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
require('dotenv').config();

const { compareAndWriteListOfStateForInsert } = require('../../utils/compare-and-write-list-fo-state-for-insert');

const router = express.Router();

router.post('/inserir', async (req, res) => {
  const { SNIRH_URL, SNIRH_TOKEN } = process.env;
  let url = `${SNIRH_URL}/rest/api/inserir?uf=DF`;

  let body = req.body;

  try {
    const currentTimestamp = new Date().getTime();

    // Generate CSV file
    await compareAndWriteListOfStateForInsert(body, currentTimestamp);

    let filePath = path.join(__dirname, `../../data/csv/to-insert-grants-${currentTimestamp}.csv`);


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
        //'Content-Type': 'text/csv; charset=utf-8',
        "Content-Type": "multipart/form-data; charset=utf-8",
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