'use strict';

var scorer = module.exports = {};

scorer.contract = require('./lib/contract');
scorer.matchpoints = require('./lib/matchpoints').standard;
scorer.matchpointsACBL = require('./lib/matchpoints').ACBL;
