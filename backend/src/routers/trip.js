const { Router } = require('express')
const express = require('express')
const router = new express.Router()
const Trip = require('../models/trip')



router.get('/trip/:id', (req, res) =>{
    console.log('Yup! its coding time :)')
    res.send('WE ARE IN '+req.params.id)
})


router.post('/trip/create', async (req, res) =>{
    
    const trip = Trip(req.body);

    try{
        await trip.save();
        res.status(201).send(trip);
    }
    catch(e){
        res.status(400).send(e);
    }
})





module.exports = router


