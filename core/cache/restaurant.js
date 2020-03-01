
const Redis = require("ioredis");
const redis = new Redis(6379, "cache")

module.exports = redis;

let geoCacheKey = "restaurants_geo_positions"

//will update if exist
function addOrUpdate(restaurant){
    let restaurantId = restaurant._id
    let latitude = restaurant.location.coordinates[0]
    let langitude = restaurant.location.coordinates[1]
    return redis.geoadd(geoCacheKey, latitude, langitude, restaurantId)
}

function getNearByRestaurants(latitude, langitude, radius){
    // WITHDIST, WITHCOORD param can give relevant metrics as well
    return redis.georadius(geoCacheKey, latitude, langitude, radius, 'km')
}

function removeRestaurant(restaurant){
    return redis.zrem(geoCacheKey, restaurant._id)
}


module.exports = {
    addOrUpdate,
    getNearByRestaurants,
    removeRestaurant,
}
