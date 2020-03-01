
var app = require('../app');
var assert = require('assert')
var request = require('supertest')

describe('Restaurants', ()=>{
    describe('GET /', ()=>{
        it('should get html home page', (done)=>{
            request(app)
                .get('/')
                .expect('Content-Type', 'text/html; charset=UTF-8')
                .expect(200, done);
        })
    })
})