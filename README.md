# bridge-scorer

[![Greenkeeper badge](https://badges.greenkeeper.io/richardschneider/bridge-scorer.svg)](https://greenkeeper.io/)
[![Travis build status](https://travis-ci.org/richardschneider/bridge-scorer.svg)](https://travis-ci.org/richardschneider/bridge-scorer)
[![Coverage Status](https://coveralls.io/repos/github/richardschneider/bridge-scorer/badge.svg?branch=master)](https://coveralls.io/github/richardschneider/bridge-scorer?branch=master)
[![npm version](https://badge.fury.io/js/bridge-scorer.svg)](https://www.npmjs.com/package/bridge-scorer) 

A collection of duplicate bridge scoring algorithms.

The [change log](https://github.com/richardschneider/bridge-scorer/releases) is automatically produced with
the help of [semantic release](https://github.com/semantic-release/semantic-release).

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

## API

### scorer.contract(contract, vulnerable, made)

Determines the declarors's score based upon the contract, vulernerability and made tricks.

**contract** is the declaror's contract 
- **level** is the number of tricks when added to the book of six tricks will be taken (1-7).
- **denomination** is the trump suit or notrumps ('S', 'H', 'D', 'C' or 'NT').
- **risk** is '', 'X' or 'XX'.

**vulnerable** is the declaror's vulernerability (true or false).

**made** is the number of tricks made over the book contract (6) or a negative number indicating the number of tricks down on the contract.

    // 3NT vulnerable making 5 (11 tricks) is 660
    var contract = {
        level: 3,
        denomination: 'NT',
        risk: ''
    };
    var score = scorer.contract(contract, true, 5);