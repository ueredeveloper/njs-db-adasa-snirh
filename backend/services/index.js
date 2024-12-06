


const desktopDbSearchByParams = require('./desktop-db/desktop-db-search-by-params');
const desktopDbSearchByKeyword = require('./desktop-db/desktop-db-search-by-keyword');
const selectByParam = require('./adasa-local/select-by-param');
const selectClosestPoints = require('./adasa-local/select-closest-points');

const snirhExportJson = require('./snirh/snirh-export-json');
const snirhExportCsv = require('./snirh/snirh-export-csv');
const snirhUpdate = require('./snirh/snirh-update');
const snirhInsert = require('./snirh/snirh-insert');
const snirhProcessError = require('./snirh/snirh-process-error');

module.exports = {
    desktopDbSearchByKeyword,
    desktopDbSearchByParams,
    selectByParam,
    selectClosestPoints,
    snirhExportJson,
    snirhExportCsv,
    snirhUpdate,
    snirhInsert,
    snirhProcessError
}
