const mongoose = require('mongoose');
const validator = require('validator');



const travelAgencySchema = new mongoose.Schema({

name:{
    type: String,
    required: true
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



const TravelAgency = mongoose.model('TravelAgency', travelAgencySchema)

module.exports = TravelAgency;