# bridge-scorer

[![Greenkeeper badge](https://badges.greenkeeper.io/richardschneider/bridge-scorer.svg)](https://greenkeeper.io/)
[![Travis build status](https://travis-ci.org/richardschneider/bridge-scorer.svg)](https://travis-ci.org/richardschneider/bridge-scorer)
[![Coverage Status](https://coveralls.io/repos/github/richardschneider/bridge-scorer/badge.svg?branch=master)](https://coveralls.io/github/richardschneider/bridge-scorer?branch=master)
[![npm version](https://badge.fury.io/js/bridge-scorer.svg)](https://www.npmjs.com/package/bridge-scorer) 

A collection of duplicate bridge scoring algorithms.

## Getting started

**bridge-scorer** is available for both Node.js and the browser.  Most modern browsers are supported.  If you want to know if your browser is compatible, run the [online test suite](https://rawgit.com/richardschneider/bridge-scorer/master/test/index.html).

Install with [npm](http://blog.npmjs.org/post/85484771375/how-to-install-npm)

    > npm install bridge-scorer --save

### Node

Include the package

    var scorer = require('bridge-scorer')
    
    TODO
    
### Browser

Include the package from your project

    <script src="./node_modules/bridge-scorer/dist/bridge-scorer.min.js" type="text/javascript"></script>

Or better yet, from the [unpkg CDN](https://unpkg.com)

    <script src="https://unpkg.com/bridge-scorer/dist/bridge-scorer"></script>

This will provide `scorer` as a global object, or `define` it if you are using [AMD](https://en.wikipedia.org/wiki/Asynchronous_module_definition).

    <script>
        TODO
    </script>
