var scorer = require('../');
var expect = require('chai').expect;

describe('Contract', function() {

    it('is exported', function() {
        expect(scorer.contract).to.be.a('function');        
    });
    
    it('scores made partial', function() {
        var contract = {
            level: 2,
            denomination: 'H',
            risk: ''
        };
        expect(scorer.contract(contract, true, 2)).to.equal(110);

        contract.risk = 'X';
        expect(scorer.contract(contract, false, 2)).to.equal(470);
    });

    it('scores passed in', function() {
        var contract = { level: 0 };
        expect(scorer.contract(contract, true, 0)).to.equal(0);
        expect(scorer.contract(contract, false, 0)).to.equal(0);
    });
    
    it('scores undertricks', function() {
        var contract = {
            level: 4,
            denomination: 'D',
            risk: ''
        };
        expect(scorer.contract(contract, false, -3)).to.equal(-150);

        contract.risk = 'X';
        expect(scorer.contract(contract, false, -3)).to.equal(-500);
        expect(scorer.contract(contract, true, -3)).to.equal(-800);
    });
    
    it('scores overtricks', function() {
        var contract = {
            level: 3,
            denomination: 'NT',
            risk: ''
        };
        expect(scorer.contract(contract, true, 5)).to.equal(660);

        contract = {
            level: 5,
            denomination: 'S',
            risk: 'XX'
        };
        expect(scorer.contract(contract, true, 6)).to.equal(1600);
        
        contract = {
            level: 6,
            denomination: 'NT',
            risk: ''
        };
        expect(scorer.contract(contract, false, 7)).to.equal(1020);
    });

});
