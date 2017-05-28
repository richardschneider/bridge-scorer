'use strict';

var imps = [
    { diff: 0, imps: 0},
    { diff: 20, imps: 1},
    { diff: 50, imps: 2},
    { diff: 90, imps: 3},
    { diff: 130, imps: 4},
    { diff: 170, imps: 5},
    { diff: 220, imps: 6},
    { diff: 270, imps: 7},
    { diff: 320, imps: 8},
    { diff: 370, imps: 9},
    { diff: 430, imps: 10},
    { diff: 500, imps: 11},
    { diff: 600, imps: 12},
    { diff: 750, imps: 13},
    { diff: 900, imps: 14},
    { diff: 1100, imps: 15},
    { diff: 1300, imps: 16},
    { diff: 1500, imps: 17},
    { diff: 1750, imps: 18},
    { diff: 2000, imps: 19},
    { diff: 2250, imps: 20},
    { diff: 2500, imps: 21},
    { diff: 3000, imps: 22},
    { diff: 3500, imps: 23},
    { diff: 4000, imps: 24},
];

function toImps(diff) {
    var n = imps.length - 1;
    var sign = 1;
    if (diff < 0) {
        sign = -1;
        diff = 0 - diff;
    }
    for (var i = 0; i < n; ++i) {
        if (imps[i].diff <= diff && diff < imps[i+1].diff) {
            return imps[i].imps * sign;
        }
    }
    return 24 * sign;
}

function pairs(games) {
    var i, j, game, score, imps;

    // Get the played games
    var played = [];
    for (i = 0; i < games.length; ++i) {
        game = games[i];
        if (game.score === 0) {
            game.impsNS = { value: -1};
            game.impsEW = { value: -1};
            played.push({
                game: game,
                scoreNS: 0
            });
        }
        else if (game.contract && game.contract.declaror && game.score) {
            game.impsNS = { value: -1};
            game.impsEW = { value: -1};
            var playedGame = {
                game: game,
                scoreNS: (game.contract.declaror === 'N' || game.contract.declaror === 'S') ? game.score : -game.score
            };
            played.push(playedGame);
        }
    }

    // Assign imps
    for (i = 0; i < played.length; ++i) {
        score = played[i].scoreNS;
        imps = 0;
        for (j = 0; j < played.length; ++j) {
            if (i !== j){
                imps += toImps(score - played[j].scoreNS);
            }
        }
        played[i].game.impsNS.value = imps / (played.length - 1);
        played[i].game.impsEW.value = -played[i].game.impsNS.value;
    }
}

function pairsDatum(games, f) {
    var i, game, score, imps;

    // Get the played games
    var played = [];
    for (i = 0; i < games.length; ++i) {
        game = games[i];
        if (game.score === 0) {
            game.impsNS = { value: -1};
            game.impsEW = { value: -1};
            played.push({
                game: game,
                scoreNS: 0
            });
        }
        else if (game.contract && game.contract.declaror && game.score) {
            game.impsNS = { value: -1};
            game.impsEW = { value: -1};
            var playedGame = {
                game: game,
                scoreNS: (game.contract.declaror === 'N' || game.contract.declaror === 'S') ? game.score : -game.score
            };
            played.push(playedGame);
        }
    }

    // Determine the datum
    var datum = f(played);

    // Assign imps
    for (i = 0; i < played.length; ++i) {
        score = played[i].scoreNS;
        imps = toImps(score - datum);
        played[i].game.impsNS.value = imps;
        played[i].game.impsEW.value = -imps;
    }

    return datum;
}

function butlerPairs (games) {
    var datum = function(g) {
        if (g.length > 3) {
            g.sort(function (a,b) { return b.scoreNS - a.scoreNS; });
            var drops = Math.ceil((g.length - 10) / 15) + 1;
            g = g.slice(drops, -drops);
        }
        var sum = g.reduce(function (a, e) { return a + e.scoreNS; }, 0);
        return Math.round((sum / g.length) / 10) * 10;
    };

    return pairsDatum(games, datum);
}

module.exports = {
    toImps: toImps,
    pairs: pairs,
    butlerPairs: butlerPairs
};
