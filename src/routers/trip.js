const { Router } = require('express')
const express = require('express')
const router = new express.Router()
const Trip = require('../models/trip')
const Booking = require('../models/booking')
const auth = require('../middleware/auth')
const mongoose = require('mongoose')
const TravelAgency = require('../models/travelAgency')
const User = require('../models/user')






// to create a new trip
router.post('/trip/create', auth, async (req, res) =>{


    if(req.travelagency){
        let owner = req.travelagency._id;
    
    console.log("owner TRAVEL AGENCY: ",owner)
        
        const trip = Trip({
                ...req.body,
                owner: owner,
                ownerModel:'TravelAgency'
        });

        try{

            await trip.save();
           return res.status(201).send(trip);
        }
        catch(e){
            res.status(400).send(e);
        }

    }

    if(req.user.role == "admin"){
        let owner = req.user._id;
    
    console.log("owner ADMIN: ",owner)
        
        const trip = Trip({
                ...req.body,
                owner: owner,
                ownerModel:'User'
        });

        try{

            await trip.save();
           return res.status(201).send(trip);
        }
        catch(e){
            res.status(400).send(e);
        }

    }
   
    else{
        res.status(404).send('Please authenticate as a travel agency!')
    }
})

// to delete a trip
router.delete('/trip/delete/:id', auth, async(req, res) =>{

    if(req.travelagency || req.user.role == "admin"){    
        const ID = req.params.id;
        let trip = null;
        try{
            if(req.travelagency){
            trip = await Trip.findByIdAndDelete({ _id: ID, owner: req.travelagency._id, maxTimeMS: 1  })
            await Booking.findOneAndDelete({ trip: ID })
            }

            else if(req.user){
                trip = await Trip.findByIdAndDelete({ _id: ID, maxTimeMS: 1  })
                await Booking.findOneAndDelete({ trip: ID })
            }
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


// get all the trips for a travel agency

router.get("/trip/travelagency/all", auth, async (req, res) =>{

    try{
        if(req.travelagency){
        await req.travelagency.populate('trips').execPopulate()
        return res.send(req.travelagency.trips)
        }
        else if(req.user.role == "admin"){
            await req.user.populate('trips').execPopulate()
            return res.send(req.user.trips)
        }
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


            return res.send(trip);
        

    }
    catch(e){
        res.send();
    }

})

// update a trip
router.patch('/trip/update/:id', auth, async(req, res) =>{
    console.log("/trip/update/:id")
    if(req.travelagency || req.user.role == "admin"){

        const id = req.params.id;
        let trip = null;
        const updates = Object.keys(req.body)
        const allowedUpdates = ['title','images','itinerary','days','description','included','seats','startingDateAndTime','endingDateAndTime']
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
        console.log("id here: ", id)
        if(!isValidOperation){
            return res.status(400).send({ error: 'Invalid update!' })
        }

        trip = await Trip.findOne({ _id: id })
        const bookings = await Booking.find({ trip: id })
        // console.log("tripp: ",trip);    
    

        try{
            // if(!trip){
            //     return res.status(404).send()
            // }
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






module.exports = router


