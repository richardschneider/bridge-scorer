var scorer = require('../');
var imps = require('../lib/imps');
var expect = require('chai').expect;

describe('International Match Points', function() {

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

    it('scores paris', function() {
        // http://bridge-tips.co.il/wp-content/uploads/2012/05/scoring.pdf
        var games = [
            { contract: { declaror: 'S' }, score: 620 },
            { contract: { declaror: 'S' }, score: 170 },
            { contract: { declaror: 'S' }, score: 140 },
            { contract: { declaror: 'S' }, score: 140 },
            { contract: { declaror: 'S' }, score: -100 }
        ];
        scorer.impsPairs(games);
        expect(games[0].impsNS.value.toFixed(2)).to.equal('10.50');
        expect(games[1].impsNS.value.toFixed(2)).to.equal('-0.25');
        expect(games[2].impsNS.value.toFixed(2)).to.equal('-1.25');
        expect(games[3].impsNS.value.toFixed(2)).to.equal('-1.25');
        expect(games[4].impsNS.value.toFixed(2)).to.equal('-7.75');
    });
});
