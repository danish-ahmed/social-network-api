var mongoose = require('mongoose');
var {Schema} = require('mongoose')
var validator = require('validator');

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
})

module.exports = mongoose.model('User', userSchema)