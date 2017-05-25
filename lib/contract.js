'use strict';

var doubledNotVulnerable = [
     0,      -100,   -300,   -500,
     -800,  -1100,  -1400,  -1700,
     -2000, -2300,  -2600,  -2900,
     -3200, -3500
];

var doubledVulnerable = [
     0,      -200,  -500,  -800,
     -1100, -1400, -1700, -2000,
     -2300, -2600, -2900, -3200,
     -3500, -3800
];

/**
 * Scores a bridge contract.
 */
function contractMade(contract, vulnerable, made) {
    // Passed in?
    if (contract.level === 0)
        return 0;
    
    var 
        overTricks = made - contract.level,
        doubled = contract.risk === 'X',
        redoubled = contract.risk === 'XX',
        strain = contract.denomination;

    // Undertricks?
    if (made < 0) {
        if (contract.risk === '')
            return made * (vulnerable ? 100 : 50);
        var penalty = vulnerable ? doubledVulnerable[-made] : doubledNotVulnerable[-made];
        if (redoubled)
            penalty *= 2;
        return penalty;
    }

    var score = 0;

    // Contract Points
    switch (strain) {
        case 'S':
        case 'H':
            score = contract.level * 30;
            break;
        case 'NT':
            score = contract.level * 30 + 10;
            break;
        case 'C':
        case 'D':
            score = contract.level * 20;
            break;
    }
    if (doubled)
        score *= 2;
    else if (redoubled)
        score *= 4;

    // Level Bonus
    if (score < 100) // Part score?
        score += 50;
    else {
        score += vulnerable ? 500 : 300; // game bonus
        if (contract.level === 7) // Grand slam?
            score += vulnerable ? 1500 : 1000;
        else if (contract.level === 6) // small slam?
            score += vulnerable ? 750 : 500;
    }

    // Insult bonus
    if (doubled)
        score += 50;
    else if (redoubled)
        score += 100;

    // Overtrick bonus
    if (overTricks > 0) {
        if (doubled)
            score += overTricks * (vulnerable ? 200 : 100);
        else if (redoubled)
            score += overTricks * (vulnerable ? 400 : 200);
        else {
            switch (strain) {
                case 'S':
                case 'H':
                case 'NT':
                    score += overTricks * 30;
                    break;
                case 'C':
                case 'D':
                    score += overTricks * 20;
                    break;
            }
        }
    }

    return score;
}

function contractTricks(contract, vulnerable, tricks) {
    return contract(
        contract,
        vulnerable,
        tricks - contract.level + 6
    );
}

module.exports = {
    made: contractMade,
    tricks: contractTricks
};
