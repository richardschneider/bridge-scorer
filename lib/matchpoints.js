'use strict';

function matchpoints (games, scoring) {
    var i, game;
    
    // Get the played games
    var played = [];
    for (i = 0; i < games.length; ++i) {
        game = games[i];
        if (game.score === 0) {
            game.matchpointsNS = { value: -1};
            game.matchpointsEW = { value: -1};
            played.push({
                game: game,
                scoreNS: 0
            });
        }
        else if (game.contract && game.contract.declaror && game.score) {
            game.matchpointsNS = { value: -1};
            game.matchpointsEW = { value: -1};
            var playedGame = { 
                game: game,
                scoreNS: (game.contract.declaror === 'N' || game.contract.declaror === 'S') ? game.score : -game.score
            };
            played.push(playedGame);
        }
    }
    
    var totalMatchpoints = played.length * scoring.win - scoring.win;
    
    // Order the played games by descending NS score (highest score first)
    played.sort(function (a,b) { return b.scoreNS - a.scoreNS; });
    
    // Assign the matchpoints to played hands.
    i = 0;
    var n = played.length - 1;
    while (i <= n)
    {
        var p = played[i];
        game = p.game;
        var matchpoints = 0;
        var score = p.scoreNS;
        var ties = 0;
        for (var j = i + 1; j <= n && score === played[j].scoreNS; ++j)
        {
            ++ties;
            matchpoints += scoring.tie;
        }
        matchpoints += scoring.win * (n - i - ties);
        game.matchpointsNS.value = matchpoints;
        game.matchpointsNS.rank = (i + 1).toString();
        game.matchpointsEW.value = totalMatchpoints - matchpoints;
        if (ties > 0) {
            game.matchpointsNS.rank += '=';
            game.matchpointsEW.rank += '=';
        }
        for (j = 0; j < ties; ++j)
        {
            ++i;
            played[i].game.matchpointsNS = game.matchpointsNS;
            played[i].game.matchpointsEW = game.matchpointsEW;
        }
        ++i;
    }    
    
    // rank EW
    played.sort(function (a,b) { return b.game.matchpointsEW.value - a.game.matchpointsEW.value; });
    i = 0;
    var n = played.length - 1;
    while (i <= n)
    {
        var p = played[i];
        game = p.game;
        var ties = 0;
        for (var j = i + 1; j <= n && game.matchpointsEW.value === played[j].game.matchpointsEW.value; ++j)
        {
            ++ties;
        }
        game.matchpointsEW.rank = (i + 1).toString();
        if (ties > 0) {
            game.matchpointsEW.rank += '=';
        }
        for (j = 0; j < ties; ++j)
        {
            ++i;
            played[i].game.matchpointsEW = game.matchpointsEW;
        }
        ++i;
    }    

    return games;
}

module.exports = {
    standard: function(games) { return matchpoints(games, { win: 2, tie: 1}); },
    ACBL: function(games) { return matchpoints(games, { win: 1.0, tie: 0.5}); }
};