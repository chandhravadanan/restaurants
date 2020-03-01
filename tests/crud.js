
var app = require('../app');
var assert = require('assert')
var request = require('supertest')
var jwt = require('jsonwebtoken')

let secretKey = process.env.JWT_SECRET_KEY
let token = jwt.sign({role : 'admin'}, secretKey , { expiresIn: '12h' });;

describe('GET /restaurants non admin', ()=>{
    it('should throw 401', (done)=>{
        request(app)
            .get('/restaurants')
            .expect(401, done);
    })
})

describe('POST /restaurant non admin', ()=>{
    it('should throw 401', (done)=>{
        request(app)
            .get('/restaurants')
            .expect(401, done);
    })
})

describe('PUT /restaurant/:id non admin', ()=>{
    it('should throw 401', (done)=>{
        request(app)
            .put('/restaurant/abcde')
            .expect(401, done);
    })
})

describe('DELETE /restaurant/:id non admin', ()=>{
    it('should throw 401', (done)=>{
        request(app)
            .delete('/restaurant/abcde')
            .expect(401, done);
    })
})

describe('GET /restaurants using admin user cookie', ()=>{
    it('should list all restaurants', (done)=>{
        request(app)
            .get('/restaurants')
            .set('Cookie', 'token='+token)
            .expect(200, done);
    })
})

describe('CRUD Restaurants APIs ', ()=>{
    let restaurantInfo = ''

    before('POST /restaurant should add restaurant', (done)=>{
        request(app)
            .post('/restaurant')
            .set('Cookie', 'token='+token)
            .send({
                "name" : "A2B",
                "area" : "chennai",
                "langitude" : 80.2838,
                "latitude" : 18.0801,
                "nonveg" : false
            })
            .expect(200)
            .then((res)=>{
                restaurantInfo = res.body
                done()
            })
    })

    it('GET /restaurants/nearby should return neary restaurants', (done)=>{
        request(app)
            .get('/restaurants/nearby')
            .query({lng : 80.2838})
            .query({lat : 18.0801})
            .query({radius : 5})       // 5Km
            .expect(200)
            .then((res)=>{
                let doc = res.body.filter((each)=>each._id==restaurantInfo._id)
                assert.deepEqual(doc[0], restaurantInfo)
                done()
            })
    })

    it('GET /restaurants should return all restaurants', (done)=>{
        request(app)
            .get('/restaurants')
            .set('Cookie', 'token='+token)
            .expect(200)
            .then((res)=>{
                let doc = res.body.filter((each)=>each._id==restaurantInfo._id)
                assert.deepEqual(doc[0], restaurantInfo)
                done()
            })
    })


    it('GET /restaurant/:id should return restaurant info', (done)=>{
        request(app)
            .get('/restaurant/'+restaurantInfo._id)
            .expect(200)
            .then((res)=>{
                assert.deepEqual(res.body, restaurantInfo)
                done()
            })
    })

    it('PUT /restaurant/:id should modify restaurant info', (done)=>{
        request(app)
            .put('/restaurant/'+restaurantInfo._id)
            .set('Cookie', 'token='+token)
            .send({
                "name" : "A2D",
            })
            .expect(200)
            .then((res)=>{
                assert.equal(res.body.name, "A2D")
                done()
            })
    })

    it('DELETE /restaurant/:id should modify restaurant active status to false', (done)=>{
        request(app)
            .delete('/restaurant/'+restaurantInfo._id)
            .set('Cookie', 'token='+token)
            .expect(200)
            .then((res)=>{
                assert.equal(res.body.active, false)
                done()
            })
    })

})
