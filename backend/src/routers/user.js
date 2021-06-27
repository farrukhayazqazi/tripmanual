const { Router } = require('express')
const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const Trip = require('../models/trip')
const Booking = require('../models/booking')
const auth = require('../middleware/auth')



// read the user data
router.get('/users/me', (req, res) =>{
    res.send(req.user);
})


// register or signup a new user
router.post('/users/signup', async (req, res) =>{

    const { email } = req.body;

    const userAlreadyExisits = await User.findOne({ email })

    if(userAlreadyExisits){
        return res.send({ error: "User already exists!"})
        
    }
    
    const user = new User(req.body)

    try{
        await user.save();
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token });
    }
    catch(e){
        res.status(400).send(e)
    }

})


// to login 
router.post('/users/login', async (req, res) =>{
    
    const { email } = req.body;

    const user = await User.findOne({ email })

    if(!user){
        return res.send({ error: "Either password or email is incorrect!"})
    }

    try{
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    }
    catch(e){
        res.send({ error: "User does not exist!"})
    }
})


// logout
router.post('/users/logout', auth, async(req, res) =>{
   
    try{
        req.user.tokens = req.user.tokens.filter((token) =>{
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    }
    
    catch(e){

        res.status(500).send()
    }
})

// Check route
router.get("/user/authenticated", auth , (req, res) =>{
    try{
        res.send(req.user);
    }
    catch(e){
        res.send(e)
    }
})

// to create a new booking
router.post('/user/createBooking', auth, async (req, res) =>{

    if(req.user){    

        const booking = Booking({
                ...req.body,
                user: req.user._id
        });

        try{
            await booking.save();
            res.status(201).send(booking);
        }
        catch(e){
            res.status(400).send(e);
        }
    }
    else{
        res.status(401).send('Please authenticate!')
    }
})

// to get all the bookings of the user
router.get('/user/bookings/all', auth, async (req, res) =>{

    if(req.user){    

        const bookings = await Booking.find({ user: req.user._id })
        
        try{
            res.status(200).send(bookings);
        }
        catch(e){
            res.status(404).send(e);
        }
    }
    else{
        res.status(401).send('Please authenticate!')
    }
})


/// trips related on home page ( to get the latest records)
router.get('/trips/latest', async (req, res) =>{

    try{
        const trips = await Trip.find().sort({ _id:1 }).limit(3)
        res.send(trips)
    }
    catch(e){
        res.send();
    }
})

module.exports = router


