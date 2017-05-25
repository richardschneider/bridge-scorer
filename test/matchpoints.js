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
        expect(games[0]).to.have.property('matchpointsNS').and.eql({value: 4, rank: '2'});
        expect(games[1]).to.have.property('matchpointsNS').and.eql({value: 6, rank: '1'});
        expect(games[2]).to.have.property('matchpointsNS').and.eql({value: 2, rank: '3'});
        expect(games[3]).to.have.property('matchpointsNS').and.eql({value: 0, rank: '4'});

        expect(games[0]).to.have.property('matchpointsEW').and.eql({value: 2, rank: '3'});
        expect(games[1]).to.have.property('matchpointsEW').and.eql({value: 0, rank: '4'});
        expect(games[2]).to.have.property('matchpointsEW').and.eql({value: 4, rank: '2'});
        expect(games[3]).to.have.property('matchpointsEW').and.eql({value: 6, rank: '1'});
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
        expect(games[0]).to.have.property('matchpointsNS').and.eql({value: 6, rank: '1'});
        expect(games[1]).to.have.property('matchpointsNS').and.eql({value: 1, rank: '3='});
        expect(games[2]).to.have.property('matchpointsNS').and.eql({value: 1, rank: '3='});
        expect(games[3]).to.have.property('matchpointsNS').and.eql({value: 4, rank: '2'});

        expect(games[0]).to.have.property('matchpointsEW').and.eql({value: 0, rank: '4'});
        expect(games[1]).to.have.property('matchpointsEW').and.eql({value: 5, rank: '1='});
        expect(games[2]).to.have.property('matchpointsEW').and.eql({value: 5, rank: '1='});
        expect(games[3]).to.have.property('matchpointsEW').and.eql({value: 2, rank: '3'});
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
        expect(games[0]).to.have.property('matchpointsNS').and.eql({value: 6, rank: '1'});
        expect(games[1]).to.have.property('matchpointsNS').and.eql({value: 2, rank: '2='});
        expect(games[2]).to.have.property('matchpointsNS').and.eql({value: 2, rank: '2='});
        expect(games[3]).to.have.property('matchpointsNS').and.eql({value: 2, rank: '2='});

        expect(games[0]).to.have.property('matchpointsEW').and.eql({value: 0, rank: '4'});
        expect(games[1]).to.have.property('matchpointsEW').and.eql({value: 4, rank: '1='});
        expect(games[2]).to.have.property('matchpointsEW').and.eql({value: 4, rank: '1='});
        expect(games[3]).to.have.property('matchpointsEW').and.eql({value: 4, rank: '1='});
    });

    it('scores a passed in game', function() {
        var games = [
            { contract: { declaror: 'N' }, score: 90 },
            { score: 0 },
            { contract: { declaror: 'N' }, score: -50 },
            { contract: { declaror: 'N' }, score: -50 },
        ];
        
        scorer.matchpoints(games);
        console.log(games)
        expect(games).to.have.lengthOf(games.length);
        expect(games[0]).to.have.property('matchpointsNS').and.eql({value: 6, rank: '1'});
        expect(games[1]).to.have.property('matchpointsNS').and.eql({value: 4, rank: '2'});
        expect(games[2]).to.have.property('matchpointsNS').and.eql({value: 1, rank: '3='});
        expect(games[3]).to.have.property('matchpointsNS').and.eql({value: 1, rank: '3='});

        expect(games[0]).to.have.property('matchpointsEW').and.eql({value: 0, rank: '4'});
        expect(games[1]).to.have.property('matchpointsEW').and.eql({value: 2, rank: '3'});
        expect(games[2]).to.have.property('matchpointsEW').and.eql({value: 5, rank: '1='});
        expect(games[3]).to.have.property('matchpointsEW').and.eql({value: 5, rank: '1='});
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
        expect(games[0]).to.have.property('matchpointsNS').and.eql({value: 4, rank: '2'});
        expect(games[1]).to.have.property('matchpointsNS').and.eql({value: 6, rank: '1'});
        expect(games[2]).to.have.property('matchpointsNS').and.eql({value: 2, rank: '3'});
        expect(games[3]).to.have.property('matchpointsNS').and.eql({value: 0, rank: '4'});
        expect(games[4]).to.not.have.property('matchpointsNS');
        expect(games[5]).to.not.have.property('matchpointsNS');
        expect(games[6]).to.not.have.property('matchpointsNS');
    });

});
