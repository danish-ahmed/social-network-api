var mongoose = require('mongoose');
var {Schema} = require('mongoose')
var validator = require('validator');
var bcrypt = require('bcrypt-nodejs');
var hashSync = require('bcrypt-nodejs').hashSync;
var compareSync = require('bcrypt-nodejs').compareSync;
var uniqueValidator = require('mongoose-unique-validator')

var jwt = require('jsonwebtoken');
var constants = require('../../config/constants');

var userSchema = new Schema({
    email:{
        type:String,
        unique:true,
        required:[true, 'Email is required'],
        trim:true,
        validate:{
            validator(email){
                return validator.isEmail(email)
            },
            message:'{VALUE} is not a valid email'
        }
    },
    firstName:{
        type:String,
        required:true,
        required:[true, 'First Name is required'],
        trim:true, 
    },
    userName:{
        type:String,
        required:true,
        unique:true,
        required:[true, 'username is required'],
        trim:true, 
    },
    lastName:{
        type:String,
        required:true,
        required:[true, 'Last Name is required'],
        trim:true,
    },
    password:{
        type:String,
        required:[true, 'Password is required'],
        trim:true,
        minlength:[6, 'Password should be atleast 6 characters long'],
    }
}, { timestamps: true })

userSchema.plugin(uniqueValidator, {
    message: '{VALUE} already taken'
})
// BEFORE SAVE HASH PASSWORD
userSchema.pre('save', function(next){
    if(this.isModified('password')){
        this.password = this._hashPassword(this.password)
    }
    return next()    
})
// ScHEMA METHODS
userSchema.methods = {
    _hashPassword: function(password){
        return hashSync(password)
    },
    authenticatePassword: function(password){
        return compareSync(password, this.password)
    },
    createToken: function(){
        return jwt.sign(
            {
            _id: this._id
            },
            constants.JWT_SECRET
        )
    },
    toJSON: function(){
        return {
            _id: this.id,
            userName: this.userName,
            token: `JWT ${this.createToken()}`
        }
    }
}


module.exports = mongoose.model('User', userSchema)