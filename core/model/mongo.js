
var mongoose = require('mongoose');

mongoose.connect('mongodb://database:27017/restaurants', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

var db = mongoose.connection;
db.on('error', (err)=>{
    console.log('mongo conn err', err)
});

db.once('open', ()=>{
  console.log("mongo connection established");
});

module.exports = mongoose
