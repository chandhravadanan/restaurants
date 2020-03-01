var app = require('../app');
var assert = require('assert')
var request = require('supertest')

describe('Login authentication', ()=>{

    describe('GET /signin.html', ()=>{
        it('should get sign page', (done)=>{
            request(app)
                .get('/signin.html')
                .expect('Content-Type', /html/)
                .expect(200, done);
        })
    })

    describe('POST /signin without credential', ()=>{
        it('should throw 400 ', (done)=>{
            request(app)
                .post('/signin')
                .expect(400, done)
        })
    })

    describe('POST /signin invalid credential', ()=>{
        it('should throw 401 ', (done)=>{
            request(app)
                .post('/signin')
                .query('username=admin&password=wrong')
                .expect(401, done)
        })
    })

    describe('POST /signin valid credential', ()=>{
        it('should give jwt cookie', (done)=>{
            request(app)
                .post('/signin')
                .query({username : process.env.ADMIN_USER_NAME})
                .query({password : process.env.ADMIN_TEST_PASSWORD})
                .expect('Set-Cookie', /token=/)
                .expect(302, done)
        })
    })

    describe('GET /signout', ()=>{
        it('should invalidate jwt cookie', (done)=>{
            request(app)
                .get('/signout')
                .expect('Set-Cookie', /token=/)
                .expect(302, done)
        })
    })

})