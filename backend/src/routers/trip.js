const { Router } = require('express')
const express = require('express')
const router = new express.Router()
const Trip = require('../models/trip')
const auth = require('../middleware/auth')



router.get('/trip/:id', (req, res) =>{
    console.log('Yup! its coding time :)')
    res.send('WE ARE IN '+req.params.id)
})


router.post('/trip/create', auth, async (req, res) =>{

    if(req.travelagency){    

        const trip = Trip(req.body);

        try{

            await trip.save();
            res.status(201).send(trip);
        }
        catch(e){
            res.status(400).send(e);
        }
    }
    else{
        res.status(404).send('Please authenticate as a travel agency!')
    }
})





module.exports = router


