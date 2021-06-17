const { Router } = require('express')
const express = require('express')
const router = new express.Router()
const Trip = require('../models/trip')
const auth = require('../middleware/auth')






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

router.get("/trip/travelagency/all", auth, async (req, res) =>{

    try{
        await req.travelagency.populate('trips').execPopulate()
        res.send(req.travelagency.trips)
    }
    catch(e){
        res.status(404).send()
    }

})

// get all the trips in the database related to the search  

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


// to find a specific trip (departure ) from a specific city 
router.get('/trip/:city/:title', async (req, res) =>{

    let title = req.params.title;
    let city = req.params.city;

    try{
        console.log("city and title: ",city + " " + title)
        const trip = await Trip.find({ title: {"$regex":title , $options: 'i'} , city: city});
        res.send(trip);
    }
    catch(e){
        res.send();
    }

})

// to find a specific trip
router.get('/trip/:id', async (req, res) =>{

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




module.exports = router


