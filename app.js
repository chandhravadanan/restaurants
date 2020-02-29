
var express = require('express')
var routes = require('./core/routes')
var bodyParser = require('body-parser')
var util = require('./core/util');

var urlencodedParser = bodyParser.urlencoded({ extended: true })
var jsonParser = bodyParser.json({type : '*/*'})

var app = express();
app.use(urlencodedParser)
app.use(jsonParser)

app.use(express.static('pages'));

app.use((req, res, next)=>{
    res.on('sendres', util.sendRes)
    util.parseCookie(req)
    next()
})

app.use(routes)

app.listen(8080, ()=>{
    console.log('Application started running in 8080')
});

module.exports = app