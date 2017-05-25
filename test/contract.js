var scorer = require('../');
var expect = require('chai').expect;

describe('Contract Made', function() {

    it('is exported', function() {
        expect(scorer.contractMade).to.be.a('function');
    });
    
    it('scores partial', function() {
        var contract = {
            level: 2,
            denomination: 'H',
            risk: ''
        };
        expect(scorer.contractMade(contract, true, 2)).to.equal(110);

        contract.risk = 'X';
        expect(scorer.contractMade(contract, false, 2)).to.equal(470);
        
        contract = {
            level: 2,
            denomination: 'C',
            risk: ''
        };
        expect(scorer.contractMade(contract, true, 2)).to.equal(90);
    });

    it('scores passed in', function() {
        var contract = { level: 0 };
        expect(scorer.contractMade(contract, true, 0)).to.equal(0);
        expect(scorer.contractMade(contract, false, 0)).to.equal(0);
        expect(scorer.contractMade(contract, true, 3)).to.equal(0);
        expect(scorer.contractMade(contract, false, -3)).to.equal(0);
    });
    
    it('scores undertricks', function() {
        var contract = {
            level: 4,
            denomination: 'D',
            risk: ''
        };
        expect(scorer.contractMade(contract, false, -3)).to.equal(-150);
        expect(scorer.contractMade(contract, true, -3)).to.equal(-300);

        contract.risk = 'X';
        expect(scorer.contractMade(contract, false, -3)).to.equal(-500);
        expect(scorer.contractMade(contract, true, -3)).to.equal(-800);

        contract.risk = 'XX';
        expect(scorer.contractMade(contract, false, -3)).to.equal(-1000);
    });
    
    it('scores overtricks', function() {
        var contract = {
            level: 3,
            denomination: 'NT',
            risk: ''
        };
        expect(scorer.contractMade(contract, true, 5)).to.equal(660);

        contract = {
            level: 5,
            denomination: 'S',
            risk: ''
        };
        expect(scorer.contractMade(contract, false, 6)).to.equal(480);
        expect(scorer.contractMade(contract, true, 6)).to.equal(680);
        
        contract.risk = 'X';
        expect(scorer.contractMade(contract, false, 6)).to.equal(750);
        expect(scorer.contractMade(contract, true, 6)).to.equal(1050);

        contract.risk = 'XX';
        expect(scorer.contractMade(contract, false, 6)).to.equal(1200);
        expect(scorer.contractMade(contract, true, 6)).to.equal(1600);
        
        contract = {
            level: 6,
            denomination: 'NT',
            risk: ''
        };
        expect(scorer.contractMade(contract, false, 7)).to.equal(1020);
        
         contract = {
            level: 5,
            denomination: 'C',
            risk: ''
        };
        expect(scorer.contractMade(contract, false, 6)).to.equal(420);
        expect(scorer.contractMade(contract, true, 6)).to.equal(620);
    });

    it('scores grand slams', function() {
        var contract = {
            level: 7,
            denomination: 'S',
            risk: ''
        };
        expect(scorer.contractMade(contract, false, 7)).to.equal(1510);
        expect(scorer.contractMade(contract, true, 7)).to.equal(2210);
    });

    it('scores small slams', function() {
        var contract = {
            level: 6,
            denomination: 'D',
            risk: ''
        };
        expect(scorer.contractMade(contract, false, 6)).to.equal(920);
        expect(scorer.contractMade(contract, true, 6)).to.equal(1370);
    });

});
