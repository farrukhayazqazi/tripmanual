const mongoose = require('mongoose')
const validator = require('validator')


const bookingSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },

    trip: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Trip'
    },

    seats_booked:{
        type: Number,
        required: true
    },


    traveller_details: {
        type: Array,
        required: true
    },

    total_amount:{
        type: Number,
        required: true
    },
    
    status:{
        type: String,
        required: true,
        default: 'not-paid'
    }

     
}, { timestamps: true })



const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking