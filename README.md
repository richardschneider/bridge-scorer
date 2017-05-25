# bridge-scorer

[![Greenkeeper badge](https://badges.greenkeeper.io/richardschneider/bridge-scorer.svg)](https://greenkeeper.io/)
[![Travis build status](https://travis-ci.org/richardschneider/bridge-scorer.svg)](https://travis-ci.org/richardschneider/bridge-scorer)
[![Coverage Status](https://coveralls.io/repos/github/richardschneider/bridge-scorer/badge.svg?branch=master)](https://coveralls.io/github/richardschneider/bridge-scorer?branch=master)
[![npm version](https://badge.fury.io/js/bridge-scorer.svg)](https://www.npmjs.com/package/bridge-scorer) 

A collection of duplicate bridge scoring algorithms.

The [change log](https://github.com/richardschneider/bridge-scorer/releases) is automatically produced with
the help of [semantic release](https://github.com/semantic-release/semantic-release).

## Features

- scores a contract
- scores a pairs session with match points (international or North American), rank and percentage 

## Getting started

**bridge-scorer** is available for both Node.js and the browser.  Most modern browsers are supported.  If you want to know if your browser is compatible, run the [online test suite](https://rawgit.com/richardschneider/bridge-scorer/master/test/index.html).

Install with [npm](http://blog.npmjs.org/post/85484771375/how-to-install-npm)

    > npm install bridge-scorer --save

### Node

Include the package

    var scorer = require('bridge-scorer')
    
### Browser

Include the package from your project

    <script src="./node_modules/bridge-scorer/dist/bridge-scorer.min.js" type="text/javascript"></script>

Or better yet, from the [unpkg CDN](https://unpkg.com)

    <script src="https://unpkg.com/bridge-scorer/dist/bridge-scorer"></script>

This will provide `scorer` as a global object, or `define` it if you are using [AMD](https://en.wikipedia.org/wiki/Asynchronous_module_definition).

## scorer.contractMade(contract, vulnerable, made)

Determines the declarors's score based upon the contract, vulernerability and made tricks.

**contract** is the declaror's contract 
- **level** is the number of tricks when added to the book of six tricks will be taken (1-7).
- **denomination** is the trump suit or notrumps ('S', 'H', 'D', 'C' or 'NT').
- **risk** is '', 'X' or 'XX'.

**vulnerable** is the declaror's vulernerability (true or false).

**made** is the number of tricks made over the book contract (6) or a negative number indicating the number of tricks down on the contract.

#### Example

    // 3NT vulnerable making 5 (11 tricks) is 660
    var contract = {
        level: 3,
        denomination: 'NT',
        risk: ''
    };
    var score = scorer.contractMade(contract, true, 5);
    
## scorer.matchpoints(games)

Determines the match points for each pair (NS and EW) based on the played games. This is the international standard measurement of achievement in a pairs competition; wins score 2 points and ties 1 point.

**games** is array of games
- **contract.declaror** is the seat that played the game ('N', 'S', 'E' or 'W')
- **score** is the [contract score](#scorercontractcontract-vulnerable-made) for the game

A passed in game is indicated with with a `score` of `0`; the `contract` is not required.

Each game is assigned the `matchpointsNS` and `matchpointsEW` properties.
- **value** is the match point value
- **rank** is the order in the competition, see [Standard competition ranking ("1224" ranking)](https://en.wikipedia.org/wiki/Ranking). Ties are indicated with an 'x='.
- **percentage** is the percentage (0-100) of the maximum number of match points that can be won

#### Example
    var games = [
        { contract: { declaror: 'N' }, score: 90 },
        { score: 0 } // passed in,
        { contract: { declaror: 'N' }, score: -50 },
        { contract: { declaror: 'N' }, score: -50 },
    ];
    console.log(scorer.matchpoints(games));

produces

    [ { contract: { declaror: 'N' },
        score: 90,
        matchpointsNS: { value: 6, rank: '1', percentage: 100 },
        matchpointsEW: { value: 0, percentage: 0, rank: '4' } },
      { score: 0,
        matchpointsNS: { value: 4, rank: '2', percentage: 66.66666666666666 },
        matchpointsEW: { value: 2, percentage: 33.33333333333333, rank: '3' } },
      { contract: { declaror: 'N' },
        score: -50,
        matchpointsNS: { value: 1, rank: '3=', percentage: 16.666666666666664 },
        matchpointsEW: { value: 5, percentage: 83.33333333333334, rank: '1=' } },
      { contract: { declaror: 'N' },
        score: -50,
        matchpointsNS: { value: 1, rank: '3=', percentage: 16.666666666666664 },
        matchpointsEW: { value: 5, percentage: 83.33333333333334, rank: '1=' } } ]


 ## scorer.matchpointsACBL(games)
 
 The [North American version](http://www.acbl.org/learn_page/how-to-play-bridge/how-to-keep-score/) of scoring match points. Same as [scorer.matchpoints](#scorermatchpointsgames) but different values are assigned to wins (1) and ties (0.5).
 
