const { Router } = require('express')
const express = require('express')
const router = new express.Router()
const TravelAgency = require('../models/travelAgency');
const User = require('../models/user');
const Booking = require('../models/booking');
const auth = require('../middleware/auth');
const { findOne } = require('../models/user');
const Trip = require('../models/trip');




router.post('/travelAgency/signup', async (req, res) =>{

    const { email } = req.body;

    const agencyAlreadyExisits = await User.findOne({ email })

    if(agencyAlreadyExisits){
        return res.send({ error: "User already exists!"})
        
    }

    const travelagency = TravelAgency(req.body)

    try{
        await travelagency.save()
        const token = await travelagency.generateAuthToken();
        res.status(201).send({ travelagency, token })
    }
    catch(e){
        res.status(400).send(e)
    }

})


router.post('/travelAgency/login', async (req, res) =>{
    

    try{
        const travelagency = await TravelAgency.findByCredentials(req.body.email, req.body.password)
        const token = await travelagency.generateAuthToken()
        res.send({ travelagency, token })
    }
    catch(e){
        res.send({ error: "User does not exist!" })
    }
})

// logout
router.post('/travelAgency/logout', auth, async(req, res) =>{
   
    try{
        req.travelagency.tokens = req.travelagency.tokens.filter((token) =>{
            return token.token !== req.token
        })
        await req.travelagency.save()
        res.send()
    }
    
    catch(e){

        res.status(500).send()
    }
})

// get the bookings of a travel agency (trips that are booked by users)
router.get('/travelAgency/getBookings', auth, async (req, res) =>{
    
    if(req.travelagency){

        try{

            const bookings = await Booking.find({ "trip_details.owner._id" : req.travelagency._id.toString()  })
            // await bookings.populate().execPopulate();
            // const user = await User.findById({ _id: bookings.user._id.toString() })
            // bookings[user] = user;
            // console.log(bookings)
            res.send(bookings)
        }
        catch(e){
            res.send();
        }
    }

})

// Check route

router.get("/travelAgency/authenticated", auth , (req, res) =>{
    try{
      
        res.send(req.travelagency.name);
    }
    catch(e){
        res.send("travel agency not found!")
    }
})


module.exports = router


