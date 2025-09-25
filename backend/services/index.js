


const desktopDbSearchByParams = require('./desktop-db/desktop-db-search-by-params');
const desktopDbSearchByKeyword = require('./desktop-db/desktop-db-search-by-keyword');
const desktopDBSearchByIdInterference = require('./desktop-db/desktop-db-search-by-id-interference');
const desktopDBSearchDuplicatedIds = require('./desktop-db/desktop-search-duplicated-ids');
const desktopDBRemoveInterference = require('./desktop-db/desktop-db-remove-interference');

const selectByParam = require('./adasa-local/select-by-param');
const selectClosestPoints = require('./adasa-local/select-closest-points');
const selectPointbyTypeAndId = require('./adasa-local/select-point-by-type-and-id');


const snirhExportJson = require('./snirh/snirh-export-json');
const snirhExportCsv = require('./snirh/snirh-export-csv');
const snirhUpdate = require('./snirh/snirh-update');
const snirhInsert = require('./snirh/snirh-insert');
const snirhProcessError = require('./snirh/snirh-process-error');

module.exports = {
    desktopDbSearchByKeyword,
    desktopDbSearchByParams,
    desktopDBSearchByIdInterference,
    desktopDBSearchDuplicatedIds,
    desktopDBRemoveInterference,
    selectByParam,
    selectClosestPoints,
    selectPointbyTypeAndId,
    snirhExportJson,
    snirhExportCsv,
    snirhUpdate,
    snirhInsert,
    snirhProcessError
}
