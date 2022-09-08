const mongoose = require('mongoose')
const uuidv1 = require('uuidv1')
const crypto = require('crypto')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true
    },
    hashed_password: {
        type: String,
        required: true
    },
    isVerified:{
        type: Boolean,
        default: false
    },
    role: {
        type: Number,
        default: 0
    },
    salt: String
},{timestamps:true})

// virtual field
userSchema.virtual('password')
.set(function(password){
    this._password = password
    this.salt = uuidv1()
    this.hashed_password = this.encryptPassword(password)
})
.get(function(){
    return this._password
})

// define methods
userSchema.methods = {
    encryptPassword: function(password){
        if(password = ''){
            return ''
        }
        try{
            return crypto.createHmac('sha256', this.salt)
            .update(password)
            .digest('hex')
        }
        catch{
            return ''
        }
    },
    authenticate: function(password){
        return (this.hashed_password===this.encryptPassword(password))
    }
}

module.exports = mongoose.model("User", userSchema)