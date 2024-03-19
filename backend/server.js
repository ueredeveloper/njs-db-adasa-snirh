// backend/server.js
const express = require('express');
const httpProxy = require('http-proxy');
const bodyParser = require('body-parser');
const cors = require('cors');

const {fetchSubterraneo, selectSubInsertModel, snirhExportJson} = require('./services');


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = process.env.PORT || 3000;

app.use('/services', fetchSubterraneo);
app.use('/services', selectSubInsertModel);
app.use('/services', snirhExportJson);

// Create a new proxy server instance
const proxy = httpProxy.createProxyServer();
// Proxy requests to Parcel server
app.use(express.static('public'));
app.use('/', (req, res) => {
  proxy.web(req, res, { target: 'http://localhost:1234' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

