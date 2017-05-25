'use strict';

var scorer = module.exports = {};

scorer.contractMade = require('./lib/contract').made;
scorer.contractTricks = require('./lib/contract').tricks;
scorer.matchpoints = require('./lib/matchpoints').standard;
scorer.matchpointsACBL = require('./lib/matchpoints').ACBL;
