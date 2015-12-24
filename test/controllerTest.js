var assert  = require('chai').assert;
var request = require('supertest');
var controller = require('../library/controller');
var assert = require('chai').assert;

describe('Controller',function(){
  describe('GET /',function(){
    it('should serve the index page',function(done){
      request(controller)
        .get('/')
        .expect('Content-type',/text\/html/)
        .expect(/(.*)<div id="join">(.*)/)
        .expect(200,done);
    })
  });
  describe('GET /ready',function(){
    it('should tell the game has enough players or not',function(done){
      request(controller)
        .get('/ready')
        .expect(/ready/)
        .expect(200,done);
    })
  });
  describe('POST /register',function(){
    it('should add a player to the game if there is chance',function(done){
      request(controller)
        .post('/register')
        .send("name=foo")
        .expect(200,'{"success":true}',done);
    })
    it('shouldn\'t add player if the game is full',function(done){
      //now max no of players is two
      controller.game.addPlayer('b');
      request(controller)
        .post('/register')
        .send('name=c')
        .expect(200,'{"success":false}',done);
    })
  });
  describe('GET /update',function(){
    it('serves current player object and the dice value',function(done){
      var response={};

      request(controller)
        .get('/update')
        .expect(200)
        .expect(/{"player":{"name":(.*),"dice":1}/,done);
    })
  });
  describe('POST /rollDice',function(){
    it('should generate and serve a dice value',function(done){
      request(controller)
        .post('/rollDice')
        .expect(/{"diceValue":/,done);
    })
  });
})
