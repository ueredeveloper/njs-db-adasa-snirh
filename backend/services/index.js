
const snirhExportJson = require('./snirh/snirh-export-json');
const snirhExportCsv = require('./snirh/snirh-export-csv');
const selectClosestPoints = require('./adasa-local/select-closest-points');
const selectDesktopDb = require('./desktop-db/desktop-db')

module.exports = {
    snirhExportJson, snirhExportCsv,
    selectClosestPoints, selectDesktopDb
}
