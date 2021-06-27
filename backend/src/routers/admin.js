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



module.exports = router


