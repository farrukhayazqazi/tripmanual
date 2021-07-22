const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



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

},

tokens: [{
    token:{
        type: String,
        required: true
    }
}]




})

// virtual property set up to make the relationship b/w travelagency and trips
travelAgencySchema.virtual('trips',{
    ref: "Trip",
    localField: '_id',
    foreignField: 'owner'
})

// only returning non-confidential data back into JSON
travelAgencySchema.methods.toJSON = function() {
    const travelagency = this
    const travelagencyObject = travelagency.toObject()

    delete travelagencyObject.password
    delete travelagencyObject.tokens

    return travelagencyObject
}
// generating authentication token
travelAgencySchema.methods.generateAuthToken = async function () {
    const travelagency = this
    const token = jwt.sign({ _id: travelagency._id.toString() }, process.env.JWT_SECRET)

    // storing token in tokens array
    travelagency.tokens = travelagency.tokens.concat({ token })
    await travelagency.save()

    return token

}

// to find the user by credentials when logging in
travelAgencySchema.statics.findByCredentials = async (email, password) =>{
    const travelagency = await TravelAgency.findOne({ email });

    if(!travelagency){
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, travelagency.password);

    if(!isMatch){
        throw new Error('Unable to login');

    }
    return travelagency
}

// Hash the plain text password before saving
travelAgencySchema.pre('save', async function(next){
    const travelagency = this;

    if(travelagency.isModified('password')){
        travelagency.password = await bcrypt.hash(travelagency.password, 8)
    }

    next()
})

// if the travel agency is deleted remove the trips associated with it
travelAgencySchema.pre('remove', async function(next){
    const travelagency = this
    await Trip.deleteMany({ owner: travelagency._id })
    next()
})

const TravelAgency = mongoose.model('TravelAgency', travelAgencySchema)

module.exports = TravelAgency;