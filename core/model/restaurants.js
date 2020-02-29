
var mongoose = require('mongoose')
var mongo = require('./mongo')

const pointSchema = new mongoose.Schema({
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
});

const schema = {
    name : {
        type : String,
        required : true
    },
    area : {
        type : String,
        required : true
    },
    location: {
        type: pointSchema,
        required: true
    },
    active : {
        type : Boolean
    },
    nonveg : {
        type : Boolean,
        required : true
    }
}



var restaurantSchema = new mongo.Schema(schema)
restaurantSchema.index({
    location: "2dsphere"
})

var Restaurants = mongo.model('restaurants', restaurantSchema);



Restaurants.add = function(info, cb){
    let restaurant = new Restaurants()
    restaurant.name = info.name
    restaurant.area = info.area
    const loc = { 
        type: 'Point', 
        coordinates: [info.langitude, info.latitude] 
    }
    restaurant.location = loc
    restaurant.active = true
    restaurant.nonveg = info.nonveg || false
    restaurant.save(cb)
}

module.exports = Restaurants;