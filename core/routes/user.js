

var express = require('express');
var Restaurants = require('./../model/restaurants')
var RestaurantsGeoCache = require('./../cache/restaurant')

var router = express.Router();


function queryNearBy(lng, lat, radius, cb){
    var point = {
        type: "Point",
        coordinates: [lng, lat]
    };

    Restaurants.find({
        location:
        { $near :
            {
                $geometry: point,
                $maxDistance: radius * 1000    // searching in kilometer radius
            }
        },
        active : true
    }, function(err, docs) {
        cb(err, docs)
    })
}

router.get("/restaurants/nearby", (req, res)=>{

    let lng = parseFloat(req.query.lng)
    let lat = parseFloat(req.query.lat)
    let radius = parseInt(req.query.radius) || 10

    if(!lng || (lng<-180 || lng>180))
        throw new Error("INVALID LANGITUDE")
    if(!lat || (lat<-90 || lat>90))
        throw new Error("INVALID LATITUDE")

    let cache = RestaurantsGeoCache.getNearByRestaurants(lng, lat, radius)
    cache.then((restaurantIds)=>{
        if(restaurantIds && restaurantIds.length>0){
            Restaurants.fetchByIds(restaurantIds, (err, docs)=>{
                res.emit('sendres', err, docs)
            })
            return;
        }
        queryNearBy(lng, lat, radius, (err, docs)=> {
            res.emit('sendres', err, docs)
        })
    })
})

router.get('/restaurant/:id', (req, res)=>{
    let id = req.params.id
    let query = Restaurants.findById(id)
    query.exec((err, info)=>{
        res.emit('sendres', err, info)
    })
})

module.exports = router;