
var express = require('express');
var Users = require('./../model/user')
var util = require('./../util')
var jwt = require('jsonwebtoken')
var crypto = require('crypto')

var router = express.Router();

function encryptPassword(pwd){
    return crypto.createHash('sha256').update(pwd).digest('hex');
}

function setJwtCookie(res){
    let secretKey = process.env.JWT_SECRET_KEY
    let token = jwt.sign({role : 'admin'}, secretKey , { expiresIn: '12h' });
    let date = new Date();
    date.setTime(date.getTime()+(12*60*60*1000));
    let expires = "; expires="+date.toGMTString();
    let cookieStr= 'token='+token+ expires +';path=/;'
    res.setHeader("Set-Cookie", cookieStr);
    res.redirect('/admin/dashboard');
}

router.post('/signin', (req, res)=>{
    let username = req.query.username
    let password = req.query.password
    if(!username || !password){
        throw new Error("EMPTY USERNAME/PASSWORD")
    }
    password = encryptPassword(password)
    Users.findOne({username, password}, (err, doc)=>{
        if(doc && doc.id){
            setJwtCookie(res)
        }else if(err){
            util.sendErrorResponse(res, 500, err)
        }else{
            util.sendResponse(res, 401, {status : 'invalid credential'})
        }
    })
})

router.get('/signout', (req, res)=>{
    let expires = "; expires=-1"
    let cookieStr= 'token='+ expires +';path=/;'
    res.setHeader("Set-Cookie", cookieStr);
    res.redirect('/');
})

module.exports = router;