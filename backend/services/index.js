
const selectByParam = require('./adasa-local/select-by-param');
const selectClosestPoints = require('./adasa-local/select-closest-points');
const snirhExportJson = require('./snirh/snirh-export-json');
const snirhExportCsv = require('./snirh/snirh-export-csv');
const selectDesktopDb = require('./desktop-db/desktop-db');

module.exports = {
    selectByParam,
    selectClosestPoints,
    snirhExportJson,
    snirhExportCsv,
    selectDesktopDb
}
