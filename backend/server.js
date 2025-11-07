// backend/server.js
const express = require('express');
const httpProxy = require('http-proxy');
const bodyParser = require('body-parser');
const cors = require('cors');
const { snirhExportJson, snirhExportCsv, selectClosestPoints, selectByParam,
  snirhUpdate, snirhProcessError, snirhInsert, desktopDbSearchByKeyword,
  desktopDbSearchByParams, desktopDBSearchByIdInterference, desktopDBSearchDuplicatedIds,
  desktopDBRemoveInterference, selectPointbyTypeAndId } = require('./services');


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const PORT = process.env.PORT || 3000;


app.use('/services', desktopDbSearchByKeyword);
app.use('/services', desktopDbSearchByParams);
app.use('/services', desktopDBSearchByIdInterference);
app.use('/services', desktopDBSearchDuplicatedIds)
app.use('/services', desktopDBRemoveInterference)
app.use('/services', snirhExportJson);
app.use('/services', snirhExportCsv);

app.use('/services', snirhUpdate);
app.use('/services', snirhInsert);

app.use('/services', snirhProcessError);

app.use('/services', selectByParam);
app.use('/services', selectClosestPoints);
app.use('/services', selectPointbyTypeAndId);


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

