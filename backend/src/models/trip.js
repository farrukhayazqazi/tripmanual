const mongoose = require('mongoose')
const validator = require('validator')


const tripSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },

    // images:{},

    description:{
        type: String,
        trim: true,
        required: true
        
    },

    itinerary:{
        type: Array,
        required: true
    },

    included:{
        type: Array,
        required: true
    },

    seats:{
        type: Number,
        required: true,
        default: 1
    },
    date:{
        type: Date,
        required: true
    },

    //completed? : boolean true or false (when the trip is over)

    reviews:{
        type: String,
    }
})


const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip