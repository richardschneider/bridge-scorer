var scorer = require('../');
var imps = require('../lib/imps');
var expect = require('chai').expect;

describe('IMPs', function() {

    it('is caclulated based on the score difference', function() {
        expect(imps.toImps(0)).to.equal(0);
        expect(imps.toImps(10)).to.equal(0);
        expect(imps.toImps(20)).to.equal(1);
        expect(imps.toImps(2240)).to.equal(19);
        expect(imps.toImps(3600)).to.equal(23);
        expect(imps.toImps(4000)).to.equal(24);
        expect(imps.toImps(50000)).to.equal(24);
    });

    it('is negative when difference is negative', function() {
        expect(imps.toImps(0)).to.equal(0);
        expect(imps.toImps(-10)).to.equal(0);
        expect(imps.toImps(-20)).to.equal(-1);
        expect(imps.toImps(-2240)).to.equal(-19);
        expect(imps.toImps(-3600)).to.equal(-23);
        expect(imps.toImps(-4000)).to.equal(-24);
        expect(imps.toImps(-50000)).to.equal(-24);
    });

    it('scores cross imps', function() {
        // http://bridge-tips.co.il/wp-content/uploads/2012/05/scoring.pdf
        var games = [
            { contract: { declaror: 'S' }, score: 620 },
            { contract: { declaror: 'S' }, score: 170 },
            { contract: { declaror: 'S' }, score: 140 },
            { contract: { declaror: 'S' }, score: 140 },
            { contract: { declaror: 'S' }, score: -100 }
        ];
        scorer.crossImps(games);
        expect(games[0].impsNS.value.toFixed(2)).to.equal('10.50');
        expect(games[1].impsNS.value.toFixed(2)).to.equal('-0.25');
        expect(games[2].impsNS.value.toFixed(2)).to.equal('-1.25');
        expect(games[3].impsNS.value.toFixed(2)).to.equal('-1.25');
        expect(games[4].impsNS.value.toFixed(2)).to.equal('-7.75');
    });

    describe('Butler pairs', function() {
        it('calcs datum for 3 or less games', function() {
            var games = [
                { contract: { declaror: 'N' }, score: 650 },
                { contract: { declaror: 'N' }, score: 170 },
                { contract: { declaror: 'S' }, score: 200 }
            ];
            var datumNS = scorer.butler(games);
            expect(datumNS).to.equal(340);
        });

        it('calcs datum for 10 or less games', function() {
            // http://www.bridgewebs.com/woburnsands/Butler%20Pairs%20Scoring.pdf
            var games = [
                { contract: { declaror: 'W' }, score: 650 },
                { contract: { declaror: 'W' }, score: 170 },
                { contract: { declaror: 'W' }, score: 1440 },
                { contract: { declaror: 'E' }, score: -100 },
                { contract: { declaror: 'E' }, score: 170 },
                { contract: { declaror: 'E' }, score: 200 }
            ];
            var datumNS = scorer.butler(games);
            expect(datumNS).to.equal(-300);
        });

        it('assigns imps based on the datum', function() {
            // http://www.bridgewebs.com/woburnsands/Butler%20Pairs%20Scoring.pdf
            var games = [
                { contract: { declaror: 'W' }, score: 650 },
                { contract: { declaror: 'W' }, score: 170 },
                { contract: { declaror: 'W' }, score: 1440 },
                { contract: { declaror: 'E' }, score: -100 },
                { contract: { declaror: 'E' }, score: 170 },
                { contract: { declaror: 'E' }, score: 200 }
            ];
            scorer.butler(games);
            expect(games[0].impsNS.value).to.equal(-8);
            expect(games[1].impsNS.value).to.equal(4);
            expect(games[2].impsNS.value).to.equal(-15);
            expect(games[3].impsNS.value).to.equal(9);
            expect(games[4].impsNS.value).to.equal(4);
            expect(games[5].impsNS.value).to.equal(3);
        });
    });


});
