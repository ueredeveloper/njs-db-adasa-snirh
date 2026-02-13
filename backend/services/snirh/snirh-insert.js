const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
require('dotenv').config();
const iconv = require('iconv-lite');

const { compareAndWriteListOfStateForInsert } = require('../../utils/compare-and-write-list-fo-state-for-insert');

const router = express.Router();


/*
  15/01/2026 - Este método ainda não está inserindo os dados com os acentos. Os acentos só estão sendo bem inseridos na edição.
  */

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

    // NÃO ESTÁ LENDO BEM QUANDO ENVIA UTF-8, ASSIM, ENVIO EM FORMATO ISO
    // Read the CSV file using promises (async/await)
    //const data = await fs.promises.readFile(filePath, 'utf8');

    /*let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: url,
      headers: {
        'Accept': 'application/json',
        //'Content-Type': 'text/csv; charset=utf-8',
        //"Content-Type": "multipart/form-data; charset=utf-8",
        "Content-Type": "text/csv",
        'Authorization': `Bearer ${SNIRH_TOKEN}`,
      },
      data: data
    };

    // Send request
    const response = await axios.request(config);*/

    // 1) Leia o arquivo como texto UTF-8
    let csvUtf8 = await fs.promises.readFile(filePath, 'utf8');

    // 2) Normalize quebras de linha para CRLF (alguns parsers CSV exigem \r\n)
    csvUtf8 = csvUtf8.replace(/\r?\n/g, '\r\n');

    // 3) Converta para ISO-8859-1
    //    Observação: caso existam caracteres fora do conjunto ISO (ex.: emojis),
    //    eles não têm mapeamento. Você pode optar por substituí-los.
    const replacer = (s) =>
      s.replace(/[^\u0000-\u00FF]/g, '?'); // substitui chars não representáveis em ISO por '?'
    const csvUtf8Safe = replacer(csvUtf8);

    const csvIsoBuffer = iconv.encode(csvUtf8Safe, 'ISO-8859-1');

    // 4) Monte a requisição (com Content-Type e Content-Length do ISO)
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'text/csv; charset=iso-8859-1',
        'Authorization': `Bearer ${SNIRH_TOKEN}`,
        'Content-Length': csvIsoBuffer.length,
        'Accept-Encoding': 'identity', // evita compressão no caminho
      },
      data: csvIsoBuffer,
      // Evita que o Axios serialize/transforme o corpo
      transformRequest: [(data) => data],
      decompress: false,
      validateStatus: () => true,
    };

    // 5) Envie
    const response = await axios.request(config);

    // Send success response
    res.json(response.data);

    // Send success response
    //res.json(response.data);

  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;