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
    images: {
        type: Array,
        required: true
    },

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


    
    //completed? : boolean true or false (when the trip is over)
    completed: {
        type: Boolean,
        default: false
    },

    reviews:{
        type: String,
        default: null
    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'TravelAgency'
    }
})

// virtual property set up to make the relationship b/w trip and bookings.
tripSchema.virtual('bookings',{
    ref: "Booking",
    localField: '_id',
    foreignField: 'trip'
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