const { Router } = require('express')
const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const Trip = require('../models/trip')
const Booking = require('../models/booking')
const auth = require('../middleware/auth')



// register or signup a new admin
router.post('/admin/signup', async (req, res) =>{

    const { email } = req.body;

    const userAlreadyExisits = await User.findOne({ email })

    if(userAlreadyExisits){
        return res.send({ error: "User already exists!"})
        
    }
    
    const user = new User({
                        ...req.body,
                        role: "admin"
                        })

    try{
        await user.save();
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token });
    }
    catch(e){
        res.status(400).send(e)
    }

})

/// to get the trips latest records 
router.get('/admin/trips/latest', auth, async (req, res) =>{

    if(req.user.role == "admin"){
    try{
        const trips = await Trip.find().sort({ _id:1 }).limit(8)
        res.send(trips)
    }
    catch(e){
        res.send();
    }
}
})

// update a trip
router.patch('/admin/trip/update/:id', auth, async(req, res) =>{

    if(req.user.role == "admin"){
        
        const id = req.params.id;
        const updates = Object.keys(req.body)
        const allowedUpdates = ['title','images','itinerary','days','description','included','seats','startingDateAndTime','endingDateAndTime']
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

        if(!isValidOperation){
            return res.status(400).send({ error: 'Invalid update!' })
        }

        const trip = await Trip.findOne({ _id: id })
        const bookings = await Booking.find({ trip: id })
        try{
            if(!trip){
                return res.status(404).send()
            }
            updates.forEach(update => trip[update] = req.body[update])
            bookings.forEach(async booking =>{ 
                booking.trip_details = trip
                await booking.save()
            })
        
            const tripSaved = await trip.save()    
            if( tripSaved ){
            return res.send(trip)
            }
        } catch(e) {
            res.status(400).send(e)
        }
    }
})

// to delete a trip
router.delete('/admin/trip/delete/:id', auth, async(req, res) =>{

    if(req.user.role == "admin"){    
        const ID = req.params.id;
        try{

            const trip = await Trip.findByIdAndDelete({ _id: ID })
            await Booking.findOneAndDelete({ trip: ID })
            if(!trip){
                res.status(404).send()
            }
            res.status(200).send(trip);
        }
        catch(e){
            res.status(400).send(e);
        }
    }
    else{
        res.status(404).send('Please authenticate as a travel agency!')
    }

})

// to find a specific booking
router.get('/admin/booking/:id', auth, async (req, res) =>{

    if(req.user.role == "admin"){
    let id = req.params.id;

    try{
        const booking = await Booking.findById({ _id: id });
        return res.send(booking);
    }
    catch(e){
        res.send();
    }
    }

})


module.exports = router


