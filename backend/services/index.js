const fetchSubterraneo = require('./fetchSubterraneo');
const selectSubInsertModel = require('./adasa-local/select-sub-insert-model')
const snirhExportJson = require('./snirh/snirh-export-json');
const snirhExportCsv = require('./snirh/snirh-export-csv');

module.exports = { fetchSubterraneo, selectSubInsertModel, snirhExportJson, snirhExportCsv }