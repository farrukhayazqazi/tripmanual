const mongoose = require('mongoose');
const validator = require('validator');



const userSchema = new mongoose.Schema({

    firstName:{
        type: String,
        required: true
    },

    lastName:{
        type: String
    },

    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid! :/')
            }
        }
    },

    password:{
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('should not contain the word password')
            }
        }
    },

    phone:{
        type: String,
        required: true,
        minlength: 11,
        trim: true

    }


})



const User = mongoose.model('User', userSchema)

module.exports = User;