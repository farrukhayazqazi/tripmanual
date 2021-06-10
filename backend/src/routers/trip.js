const { Router } = require('express')
const express = require('express')
const router = new express.Router()
const Trip = require('../models/trip')
const auth = require('../middleware/auth')


// to find a specific trip
router.get('/trip/:id', auth, async (req, res) =>{

    let id = req.params.id;

    try{
        const trip = await Trip.findById({ _id: id });
        await trip.populate('owner').execPopulate();
        res.send(trip);
    }
    catch(e){
        res.send();
    }

})

// to create a new trip
router.post('/trip/create', auth, async (req, res) =>{

    if(req.travelagency){    

        const trip = Trip({
                ...req.body,
                owner: req.travelagency._id
        });

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


// get all the trips for a travel agency

router.get("/trip/all", auth, async (req, res) =>{

    try{
        await req.travelagency.populate('trips').execPopulate()
        res.send(req.travelagency.trips)
    }
    catch(e){
        res.status(404).send()
    }

})

// get all the trips in the database

router.get("/trip/all/:id", async (req, res) =>{

    try{
      let title = req.params.id

      const trips = await Trip.find({ title: {"$regex":title , $options: 'i'} })
      res.send(trips); 

    }
    catch(e){
        res.send();
    }
})




module.exports = router


