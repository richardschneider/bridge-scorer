var scorer = require('../');
var expect = require('chai').expect;

describe('Contract', function() {

    it('is exported', function() {
        expect(scorer.contract).to.be.a('function');        
    });
    
    it('made partial', function() {
        var contract = {
            level: 2,
            denomination: 'H',
            risk: ''
        };
        expect(scorer.contract(contract, true, 2)).to.equal(110);

        contract.risk = 'X';
        expect(scorer.contract(contract, false, 2)).to.equal(470);
    });

    it('passed in', function() {
        var contract = { level: 0 };
        expect(scorer.contract(contract, true, 0)).to.equal(0);
        expect(scorer.contract(contract, false, 0)).to.equal(0);
    });

});
