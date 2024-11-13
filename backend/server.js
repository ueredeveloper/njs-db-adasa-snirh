// backend/server.js
const express = require('express');
const httpProxy = require('http-proxy');
const bodyParser = require('body-parser');
const cors = require('cors');
const { snirhExportJson, snirhExportCsv, selectClosestPoints, selectDesktopDb, selectByParam, snirhUpdate, snirhProcessError, snirhInsert } = require('./services');


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = process.env.PORT || 3000;

app.use('/services', selectDesktopDb);

app.use('/services', snirhExportJson);
app.use('/services', snirhExportCsv);

app.use('/services', snirhUpdate);
app.use('/services', snirhInsert);

app.use('/services', snirhProcessError);

app.use('/services', selectByParam);
app.use('/services', selectClosestPoints);




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

