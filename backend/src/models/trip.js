const mongoose = require('mongoose')
const validator = require('validator')


const tripSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    
    days:{
        type: Number,
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

    endingDateAndTime: [{
        date: {
            type: String,
            required: true
        },

        time:{
            type: String,
            required: true 
        }
    }],

    startingDateAndTime: [{
        date: {
            type: String,
            required: true
        },

        time:{
            type: String,
            required: true 
        }
    }],
    
    //completed? : boolean true or false (when the trip is over)
    completed: {
        type: Boolean,
        default: false
    },

    reviews:{
        type: String,
    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'TravelAgency'
    }
})

// if the trip tenure is completed 

tripSchema.methods.isCompleted = () =>{
    const trip = this

    if(trip.endingDateAndTime.date == Date.now){
        trip.completed = true;
    }
}

const Trip = mongoose.model('Trip', tripSchema);

module.exports = Trip