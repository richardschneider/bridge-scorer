var scorer = require('../');
var expect = require('chai').expect;

describe('Matchpoints ACBL', function() {

    it('is exported', function() {
        expect(scorer.matchpointsACBL).to.be.a('function');        
    });
    
    it('scores', function() {
        // see http://www.acbl.org/learn_page/how-to-play-bridge/how-to-keep-score/
        var games = [
            { contract: { declaror: 'N' }, score: 420 },
            { contract: { declaror: 'S' }, score: 430 },
            { contract: { declaror: 'E' }, score: -500 },
            { contract: { declaror: 'N' }, score: 420 },
            { contract: { declaror: 'N' }, score: 450 },
            { contract: { declaror: 'N' }, score: -50 },
            { contract: { declaror: 'N' }, score: 170 }
        ];
        
        scorer.matchpointsACBL(games);
        expect(games).to.have.lengthOf(games.length);
        expect(games[0].matchpointsNS.value).to.equal(2.5);
        expect(games[1].matchpointsNS.value).to.equal(4);
        expect(games[2].matchpointsNS.value).to.equal(6);
        expect(games[3].matchpointsNS.value).to.equal(2.5);
        expect(games[4].matchpointsNS.value).to.equal(5);
        expect(games[5].matchpointsNS.value).to.equal(0);
        expect(games[6].matchpointsNS.value).to.equal(1);

        expect(games[0].matchpointsEW.value).to.equal(3.5);
        expect(games[1].matchpointsEW.value).to.equal(2);
        expect(games[2].matchpointsEW.value).to.equal(0);
        expect(games[3].matchpointsEW.value).to.equal(3.5);
        expect(games[4].matchpointsEW.value).to.equal(1);
        expect(games[5].matchpointsEW.value).to.equal(6);
        expect(games[6].matchpointsEW.value).to.equal(5);
    });

    it('ranks', function() {
        var games = [
            { contract: { declaror: 'N' }, score: 420 },
            { contract: { declaror: 'S' }, score: 430 },
            { contract: { declaror: 'E' }, score: -500 },
            { contract: { declaror: 'N' }, score: 420 },
            { contract: { declaror: 'N' }, score: 450 },
            { contract: { declaror: 'N' }, score: -50 },
            { contract: { declaror: 'N' }, score: 170 }
        ];

        scorer.matchpointsACBL(games);
        expect(games).to.have.lengthOf(games.length);
        expect(games[0].matchpointsNS.rank).to.equal('4=');
        expect(games[1].matchpointsNS.rank).to.equal('3');
        expect(games[2].matchpointsNS.rank).to.equal('1');
        expect(games[3].matchpointsNS.rank).to.equal('4=');
        expect(games[4].matchpointsNS.rank).to.equal('2');
        expect(games[5].matchpointsNS.rank).to.equal('7');
        expect(games[6].matchpointsNS.rank).to.equal('6');

        expect(games[0].matchpointsEW.rank).to.equal('3=');
        expect(games[1].matchpointsEW.rank).to.equal('5');
        expect(games[2].matchpointsEW.rank).to.equal('7');
        expect(games[3].matchpointsEW.rank).to.equal('3=');
        expect(games[4].matchpointsEW.rank).to.equal('6');
        expect(games[5].matchpointsEW.rank).to.equal('1');
        expect(games[6].matchpointsEW.rank).to.equal('2');
    });

    it('scores Fun Bridge', function() {
        // see https://www.funbridge.com/en/help_faq/touch/scores
        var games = [
            { contract: { declaror: 'N' }, score: 650 },
            { contract: { declaror: 'N' }, score: 620 },
            { contract: { declaror: 'N' }, score: 620 },
            { contract: { declaror: 'N' }, score: 620 },
            { contract: { declaror: 'N' }, score: 620 },
            { contract: { declaror: 'N' }, score: 170 },
            { contract: { declaror: 'N' }, score: 170 },
            { contract: { declaror: 'N' }, score: 140 },
            { contract: { declaror: 'N' }, score: 110 }
        ];
        scorer.matchpointsACBL(games);
        expect(games[0].matchpointsNS.value).to.equal(8);
        expect(games[1].matchpointsNS.value).to.equal(5.5);
        expect(games[2].matchpointsNS.value).to.equal(5.5);
        expect(games[3].matchpointsNS.value).to.equal(5.5);
        expect(games[4].matchpointsNS.value).to.equal(5.5);
        expect(games[5].matchpointsNS.value).to.equal(2.5);
        expect(games[6].matchpointsNS.value).to.equal(2.5);
        expect(games[7].matchpointsNS.value).to.equal(1);
        expect(games[8].matchpointsNS.value).to.equal(0);
    });
 
    it('determines percentage', function() {
        // see https://www.funbridge.com/en/help_faq/touch/scores
        var games = [
            { contract: { declaror: 'N' }, score: 650 },
            { contract: { declaror: 'N' }, score: 620 },
            { contract: { declaror: 'N' }, score: 620 },
            { contract: { declaror: 'N' }, score: 620 },
            { contract: { declaror: 'N' }, score: 620 },
            { contract: { declaror: 'N' }, score: 170 },
            { contract: { declaror: 'N' }, score: 170 },
            { contract: { declaror: 'N' }, score: 140 },
            { contract: { declaror: 'N' }, score: 110 }
        ];
        scorer.matchpointsACBL(games);
        expect(games[0].matchpointsNS.percentage.toFixed(2)).to.equal('100.00');
        expect(games[1].matchpointsNS.percentage.toFixed(2)).to.equal('68.75');
        expect(games[2].matchpointsNS.percentage.toFixed(2)).to.equal('68.75');
        expect(games[3].matchpointsNS.percentage.toFixed(2)).to.equal('68.75');
        expect(games[4].matchpointsNS.percentage.toFixed(2)).to.equal('68.75');
        expect(games[5].matchpointsNS.percentage.toFixed(2)).to.equal('31.25');
        expect(games[6].matchpointsNS.percentage.toFixed(2)).to.equal('31.25');
        expect(games[7].matchpointsNS.percentage.toFixed(2)).to.equal('12.50');
        expect(games[8].matchpointsNS.percentage.toFixed(2)).to.equal('0.00');
    });

});
