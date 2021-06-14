const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


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

    },

    tokens: [{
        token:{
            type: String,
            required: true
        }
    }]


})

// virtual property set up to make the relationship b/w user and bookings.
userSchema.virtual('bookings',{
    ref: "Booking",
    localField: '_id',
    foreignField: 'user'
})


// only returning non-confidential data back into JSON
userSchema.methods.toJSON = function() {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
}

// generating authentication token
userSchema.methods.generateAuthToken = async function (){
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'finalyearproject')

    // storing token in tokens array

    user.tokens = user.tokens.concat({ token })
    await user.save(); 

    return token
}
// to find the user by credentials when logging in
userSchema.statics.findByCredentials = async (email, password) =>{
    const user = await User.findOne({ email });

    if(!user){
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
        throw new Error('Unable to login');

    }
    return user
}


// Hash the plain text password before saving
userSchema.pre('save', async function(next){
    const user = this;

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})



const User = mongoose.model('User', userSchema)

module.exports = User;