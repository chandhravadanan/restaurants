

var mongo = require('./mongo')

const schema = {
    username : {
        type : String,
        required : true,
        unique : true,
    },
    password: {
        type: String,
        required: true
    },
    status : {
        type : Boolean,
        required : true
    },
    isadmin :{           // Roles can be maintained separate collection
        type : Boolean,
        required : true
    }
}

var userSchema = new mongo.Schema(schema)
var Users = mongo.model('users', userSchema);

function checkAddAdminUser(){
    Users.find({username : process.env.ADMIN_USER_NAME}, (err, doc)=>{
        if(!err || doc.length<=0){
            let user = new Users()
            user.username = process.env.ADMIN_USER_NAME
            user.password = process.env.ADMIN_USER_PASSWORD_HASH
            user.status = true
            user.isadmin = true
            user.save((err)=>{
                if(!err){
                    console.log("admin user added successfully")
                }
            })
        }
    })
}

checkAddAdminUser()

module.exports = Users;