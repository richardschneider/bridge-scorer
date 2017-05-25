var scorer = require('../');
var expect = require('chai').expect;

describe('Matchpoints', function() {

    it('is exported', function() {
        expect(scorer.matchpoints).to.be.a('function');        
    });
    
    it('returns the games', function() {
        var games = [
            { contract: { declaror: 'S' }, score: 400 },
            { contract: { declaror: 'S' }, score: 430 },
            { contract: { declaror: 'S' }, score: 150 },
            { contract: { declaror: 'S' }, score: -50 },
        ];
        
        var g = scorer.matchpoints(games);
        expect(g).to.equal(games);
    });
    
    it('scores a simple game (no ties)', function() {
        var games = [
            { contract: { declaror: 'S' }, score: 400 },
            { contract: { declaror: 'S' }, score: 430 },
            { contract: { declaror: 'S' }, score: 150 },
            { contract: { declaror: 'S' }, score: -50 },
        ];
        
        scorer.matchpoints(games);
        expect(games).to.have.lengthOf(games.length);
        expect(games[0].matchpointsNS.value).to.equal(4);
        expect(games[1].matchpointsNS.value).to.equal(6);
        expect(games[2].matchpointsNS.value).to.equal(2);
        expect(games[3].matchpointsNS.value).to.equal(0);

        expect(games[0].matchpointsEW.value).to.equal(2);
        expect(games[1].matchpointsEW.value).to.equal(0);
        expect(games[2].matchpointsEW.value).to.equal(4);
        expect(games[3].matchpointsEW.value).to.equal(6);
    });
    
    it('scores a 2-way tie', function() {
        var games = [
            { contract: { declaror: 'W' }, score: 110 },
            { contract: { declaror: 'W' }, score: 140 },
            { contract: { declaror: 'W' }, score: 140 },
            { contract: { declaror: 'W' }, score: 120 },
        ];
        
        scorer.matchpoints(games);
        expect(games).to.have.lengthOf(games.length);
        expect(games[0].matchpointsNS.value).to.equal(6);
        expect(games[1].matchpointsNS.value).to.equal(1);
        expect(games[2].matchpointsNS.value).to.equal(1);
        expect(games[3].matchpointsNS.value).to.equal(4);

        expect(games[0].matchpointsEW.value).to.equal(0);
        expect(games[1].matchpointsEW.value).to.equal(5);
        expect(games[2].matchpointsEW.value).to.equal(5);
        expect(games[3].matchpointsEW.value).to.equal(2);
    });

    it('scores a 3-way tie', function() {
        var games = [
            { contract: { declaror: 'W' }, score: -50 },
            { contract: { declaror: 'W' }, score: 90 },
            { contract: { declaror: 'W' }, score: 90 },
            { contract: { declaror: 'W' }, score: 90 },
        ];
        
        scorer.matchpoints(games);
        expect(games).to.have.lengthOf(games.length);
        expect(games[0].matchpointsNS.value).to.equal(6);
        expect(games[1].matchpointsNS.value).to.equal(2);
        expect(games[2].matchpointsNS.value).to.equal(2);
        expect(games[3].matchpointsNS.value).to.equal(2);

        expect(games[0].matchpointsEW.value).to.equal(0);
        expect(games[1].matchpointsEW.value).to.equal(4);
        expect(games[2].matchpointsEW.value).to.equal(4);
        expect(games[3].matchpointsEW.value).to.equal(4);
    });

    it('scores a passed in game', function() {
        var games = [
            { contract: { declaror: 'N' }, score: 90 },
            { score: 0 },
            { contract: { declaror: 'N' }, score: -50 },
            { contract: { declaror: 'N' }, score: -50 },
        ];
        
        scorer.matchpoints(games);
        expect(games).to.have.lengthOf(games.length);
        expect(games[0].matchpointsNS.value).to.equal(6);
        expect(games[1].matchpointsNS.value).to.equal(4);
        expect(games[2].matchpointsNS.value).to.equal(1);
        expect(games[3].matchpointsNS.value).to.equal(1);

        expect(games[0].matchpointsEW.value).to.equal(0);
        expect(games[1].matchpointsEW.value).to.equal(2);
        expect(games[2].matchpointsEW.value).to.equal(5);
        expect(games[3].matchpointsEW.value).to.equal(5);
    });
    
    it('ignores games with no contract, declaror or score', function() {
        var games = [
            { contract: { declaror: 'S' }, score: 400 },
            { contract: { declaror: 'S' }, score: 430 },
            { contract: { declaror: 'S' }, score: 150 },
            { contract: { declaror: 'S' }, score: -50 },
            {},
            { contract: {}},
            { contract: { declaror: 'S' } }        
        ];
        
        scorer.matchpoints(games);
        expect(games).to.have.lengthOf(games.length);
        expect(games[0].matchpointsNS.value).to.equal(4);
        expect(games[1].matchpointsNS.value).to.equal(6);
        expect(games[2].matchpointsNS.value).to.equal(2);
        expect(games[3].matchpointsNS.value).to.equal(0);
        expect(games[4]).to.not.have.property('matchpointsNS');
        expect(games[5]).to.not.have.property('matchpointsNS');
        expect(games[6]).to.not.have.property('matchpointsNS');
    });
    
    it('actual session board', function () {
        var games = [
            { contract: { declaror: 'N' }, score: -50 },
            { contract: { declaror: 'N' }, score: 150 },
            { contract: { declaror: 'N' }, score: 120 },
            { contract: { declaror: 'N' }, score: 120 },
            { contract: { declaror: 'S' }, score: 110 },
            { contract: { declaror: 'N' }, score: -100 },
            { contract: { declaror: 'N' }, score: -50 },
            { contract: { declaror: 'N' }, score: 120 }
        ];
        scorer.matchpoints(games);
        expect(games[0].matchpointsNS.value).to.equal(3);
        expect(games[1].matchpointsNS.value).to.equal(14);
        expect(games[2].matchpointsNS.value).to.equal(10);
        expect(games[3].matchpointsNS.value).to.equal(10);
        expect(games[4].matchpointsNS.value).to.equal(6);
        expect(games[5].matchpointsNS.value).to.equal(0);
        expect(games[6].matchpointsNS.value).to.equal(3);
        expect(games[7].matchpointsNS.value).to.equal(10);
    });

    it('ranks', function() {
        var games = [
            { contract: { declaror: 'W' }, score: -50 },
            { contract: { declaror: 'W' }, score: 90 },
            { contract: { declaror: 'W' }, score: 90 },
            { contract: { declaror: 'W' }, score: 90 },
        ];

        scorer.matchpoints(games);
        expect(games).to.have.lengthOf(games.length);
        expect(games[0].matchpointsNS.rank).to.equal('1');
        expect(games[1].matchpointsNS.rank).to.equal('2=');
        expect(games[2].matchpointsNS.rank).to.equal('2=');
        expect(games[3].matchpointsNS.rank).to.equal('2=');

        expect(games[0].matchpointsEW.rank).to.equal('4');
        expect(games[1].matchpointsEW.rank).to.equal('1=');
        expect(games[2].matchpointsEW.rank).to.equal('1=');
        expect(games[3].matchpointsEW.rank).to.equal('1=');
    });

});
