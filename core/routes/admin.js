
var express = require('express');
var Restaurants = require('./../model/restaurants')
var util = require('./../util')
//var cache = require('./../cache/redis')

var router = express.Router();

function adminAuthChecker(req, res, next){
    if(req.isAdmin){
        next()
    }else{
        let err = new Error("AUTHOURIZATION NEEDED")
        util.sendErrorResponse(res, 401, err)
    }
}

router.get('/restaurants', adminAuthChecker, (req, res)=>{
    let query = Restaurants.find({active:true})
    query.exec(function(err, docs){
        res.emit('sendres', err, docs)
    })
})

router.post('/restaurant', adminAuthChecker, (req, res)=>{
    if(!req.body.name)
        throw new Error("INVALID RESTAURANT NAME")
    if(!req.body.area)
        throw new Error("INVALID AREA NAME")
    if(req.body.latitude<-90 || req.body.latitude>90)
        throw new Error("INVALID LATITUDE")
    if(req.body.langitude<-180 || req.body.langitude>180)
        throw new Error("INVALID LANGITUDE")

    Restaurants.add(req.body, (err, info)=>{
        //if(info)
            //cache.addRestaurant(info)

        res.emit('sendres', err, info)
    })
})

router.put('/restaurant/:id', adminAuthChecker, (req, res)=>{
    let restaurantId = req.params.id
    Restaurants.findByIdAndUpdate(restaurantId, req.body, {new : true}, (err, docs)=>{
        res.emit('sendres', err, docs)
    })
})

router.delete('/restaurant/:id', adminAuthChecker, (req, res)=>{
    let restaurantId = req.params.id
    Restaurants.findByIdAndUpdate(restaurantId, {active: false}, {new : true}, (err, docs)=>{
        res.emit('sendres', err, docs)
    })
})


module.exports = router;