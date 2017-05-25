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
        expect(games[0]).to.have.property('matchpointsNS').and.eql({value: 2.5, rank: '4='});
        expect(games[1]).to.have.property('matchpointsNS').and.eql({value: 4, rank: '3'});
        expect(games[2]).to.have.property('matchpointsNS').and.eql({value: 6, rank: '1'});
        expect(games[3]).to.have.property('matchpointsNS').and.eql({value: 2.5, rank: '4='});
        expect(games[4]).to.have.property('matchpointsNS').and.eql({value: 5, rank: '2'});
        expect(games[5]).to.have.property('matchpointsNS').and.eql({value: 0, rank: '7'});
        expect(games[6]).to.have.property('matchpointsNS').and.eql({value: 1, rank: '6'});

        expect(games[0]).to.have.property('matchpointsEW').and.eql({value: 3.5, rank: '3='});
        expect(games[1]).to.have.property('matchpointsEW').and.eql({value: 2, rank: '5'});
        expect(games[2]).to.have.property('matchpointsEW').and.eql({value: 0, rank: '7'});
        expect(games[3]).to.have.property('matchpointsEW').and.eql({value: 3.5, rank: '3='});
        expect(games[4]).to.have.property('matchpointsEW').and.eql({value: 1, rank: '6'});
        expect(games[5]).to.have.property('matchpointsEW').and.eql({value: 6, rank: '1'});
        expect(games[6]).to.have.property('matchpointsEW').and.eql({value: 5, rank: '2'});
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
 
});
