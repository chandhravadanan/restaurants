
var jwt = require('jsonwebtoken')

function sendRes(err, data){
    if(err){
        sendErrorResponse(this, 500, err)
    }else{
        sendResponse(this, 200, data)
    }
}

function sendErrorResponse(res, resCode, err){
    console.log(err.message)
    res.statusCode = resCode
    res.end(JSON.stringify({message : err.message}))
}

function sendResponse(res, resCode, data){
    res.statusCode = resCode
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(data))
}

function parseCookie(req){
    let parsedInfo = {};
    if (req && req.headers) {
        let cookies = req.headers.cookie
        if (typeof cookies === 'string') {
            cookies = cookies.split('; ');
            for (var i = 0; i < cookies.length; i++) {
                var cur = cookies[i].split('=');
                parsedInfo[cur[0]] = cur[1];
            }
        }
    }

    if(parsedInfo['token']){
        try{
            let secretKey = process.env.JWT_SECRET_KEY
            let decoded = jwt.verify(parsedInfo['token'], secretKey);
            if(decoded.role === 'admin'){
                req.isAdmin = true
            }
        }catch(e){
            console.log('jwt decode error');
        }
    }
}


module.exports = {
    sendRes,
    sendResponse,
    sendErrorResponse,
    parseCookie
}