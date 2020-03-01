
var app = require('../app');
var assert = require('assert')
var request = require('supertest')

describe('Restaurants', ()=>{
    describe('GET /', ()=>{
        it('should get html home page', (done)=>{
            request(app)
                .get('/')
                .expect('Content-Type', /html/)
                .expect(200, done);
        })
    })

    describe('GET /signin', ()=>{
        it('should get signin page', (done)=>{
            request(app)
                .get('/signin.html')
                .expect('Content-Type', /html/)
                .expect(200, done);
        })
    })
})