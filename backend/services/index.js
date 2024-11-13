
const selectDesktopDb = require('./desktop-db/desktop-db');

const selectByParam = require('./adasa-local/select-by-param');
const selectClosestPoints = require('./adasa-local/select-closest-points');

const snirhExportJson = require('./snirh/snirh-export-json');
const snirhExportCsv = require('./snirh/snirh-export-csv');
const snirhUpdate = require('./snirh/snirh-update');
const snirhInsert = require('./snirh/snirh-insert');
const snirhProcessError = require('./snirh/snirh-process-error');


module.exports = {
    selectDesktopDb,
    selectByParam,
    selectClosestPoints,
    snirhExportJson,
    snirhExportCsv,
    snirhUpdate,
    snirhInsert,
    snirhProcessError
}
