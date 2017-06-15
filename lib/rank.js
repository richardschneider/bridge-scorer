'use strict';

function rank(results) {
    // Order the results by descending score (highest score first)
    results = results.slice().sort(function (a,b) { return b.score - a.score; });

    // Assign the rank
    var i = 0, j;
    var n = results.length - 1;
    while (i <= n)
    {
        var r = results[i];
        var score = r.score;
        var ties = 0;
        for (j = i + 1; j <= n && score === results[j].score; ++j)
        {
            ++ties;
        }
        r.rank = (i + 1).toString();
        if (ties > 0) {
            r.rank += '=';
        }
        for (j = 0; j < ties; ++j)
        {
            results[++i].rank = r.rank;
        }
        ++i;
    }

    return results;
}

module.exports = rank;
