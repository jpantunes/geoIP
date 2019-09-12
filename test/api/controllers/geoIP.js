var should = require('should');
var request = require('supertest');
var server = require('../../../app');

describe('controllers', function() {

  describe('location', function() {

    describe('GET /location/{ip}', function() {

      it('should return an error for a string input', function(done) {

        request(server)
          .get('/location/abcd')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(500)
          .end(function(err, res) {
            res.body.should.eql({"message":"invalid input syntax for type inet: \"abcd\"","name":"error","length":97,"severity":"ERROR","code":"22P02","file":"network.c","line":"59","routine":"network_in"});
            done();
          });
      });

      it('should accept an IPv4 address', function(done) {

        request(server)
          .get('/location/81.84.143.199')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            should.not.exist(err);
              res.body.should.eql({city_name: 'Torre da Marinha', country_iso_code: 'PT', country_name: 'Portugal', network: '81.84.140.0/22'});
              done();
          });
      });

    });

  });

});
