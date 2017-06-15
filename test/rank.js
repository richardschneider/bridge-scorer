var scorer = require('../');
var expect = require('chai').expect;

describe('Rank', function() {

    it('is exported', function() {
        expect(scorer.rank).to.be.a('function');
    });

    it('ranks the results', function() {
      var results = [
        { score: 10 },
        { score: 20 },
        { score: 30 },
        { score: 40 }
      ];
      scorer.rank(results);
      expect(results[3]).to.have.property('rank', '1');
      expect(results[2]).to.have.property('rank', '2');
      expect(results[1]).to.have.property('rank', '3');
      expect(results[0]).to.have.property('rank', '4');
    });

    it('ranks the results with ties', function() {
      var results = [
        { score: 10 },
        { score: 20 },
        { score: 20 },
        { score: 40 }
      ];
      scorer.rank(results);
      expect(results[3]).to.have.property('rank', '1');
      expect(results[2]).to.have.property('rank', '2=');
      expect(results[1]).to.have.property('rank', '2=');
      expect(results[0]).to.have.property('rank', '4');
    });

});
