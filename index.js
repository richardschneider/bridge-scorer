'use strict';

var scorer = module.exports = {};

scorer.contractMade = require('./lib/contract').made;
scorer.contractTricks = require('./lib/contract').tricks;
scorer.contractResult = require('./lib/contract').result;
scorer.matchpoints = require('./lib/matchpoints').standard;
scorer.matchpointsACBL = require('./lib/matchpoints').ACBL;
scorer.crossImps = require('./lib/imps').crossImps;
scorer.butlerPairs = require('./lib/imps').butlerPairs;
