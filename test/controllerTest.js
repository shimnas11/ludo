var assert  = require('chai').assert;
var request = require('supertest');
var controller = require('../library/controller');

describe('Controller',function(){
	describe('GET /',function(){
		it('should serve the login page',function(done){
       		request(controller)
        	.get('/')
        	.expect(302,done);
    	});
	});
  describe('GET /username',function(){
    it('should give the user name',function(done){
      request(controller)
        .get('/username')
        .send('name=situ')
        .expect(200,done);
    });
  });
});
