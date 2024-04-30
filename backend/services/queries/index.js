const querySelectClosestPoints = require('./query-select-closest-points');
const querySelectSubterraneasForInsert = require('./query-select-subterraneas-for-insert');
const querySelectSuperficiaisForInsert = require('./query-select-superficiais-for-insert');
const querySelectSuperficiaisForUpdate = require('./query-select-superficiais-for-update')

module.exports = {
    querySelectClosestPoints, 
    querySelectSubterraneasForInsert, 
    querySelectSuperficiaisForInsert,
    querySelectSuperficiaisForUpdate}