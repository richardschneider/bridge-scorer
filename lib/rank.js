'use strict';

function rank(results) {
    // Order the results by descending score (highest score first)
    results = results.slice().sort(function (a,b) { return b.score - a.score; });

    // Assign the rank
    var i = 0, j;
    var n = results.length - 1;
    var maxRank = 0;
    var r;
    while (i <= n)
    {
        r = results[i];
        var score = r.score;
        var ties = 0;
        for (j = i + 1; j <= n && score === results[j].score; ++j)
        {
            ++ties;
        }
        maxRank = i + 1;
        r.rank = maxRank.toString();
        if (ties > 0) {
            r.rank += '=';
        }
        for (j = 0; j < ties; ++j)
        {
            results[++i].rank = r.rank;
        }
        ++i;
    }

    for (i = 0; i <= n; ++i) {
        r = results[i];
        var rank = parseInt(r.rank, 10);
        if (rank === 1) {
            r.scale = 1;
        } else {
            r.scale = (maxRank - rank) / (maxRank);
        }
    }

    return results;
}

module.exports = rank;
