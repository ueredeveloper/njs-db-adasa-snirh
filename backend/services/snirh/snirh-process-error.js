const express = require('express');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const router = express.Router();

require('dotenv').config();

router.get('/snirh-process-error', async (req, res) => {
    let { uf, idArquivoErro } = req.query;

    const { SNIRH_URL, SNIRH_TOKEN} = process.env;

    // Constructing the URL with parameters
    let url = new URL(`${SNIRH_URL}/rest/api/download/erros-processamento`);
    url.searchParams.append('uf', uf);
    url.searchParams.append('idArquivoErro', idArquivoErro);

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + SNIRH_TOKEN,
            },
        });

        const text = await response.text();

        if (!response.ok) {
            // Send the error details to the frontend
            res.status(response.status).json({
                message: 'Failed to fetch data from SNIRH',
                status: response.status,
                statusText: response.statusText,
                error: text
            });
        } else {
            // Send the fetched text to the frontend
            res.send(text);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send('An error occurred.');
    }
});

module.exports = router;
