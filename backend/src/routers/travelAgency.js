const { Router } = require('express')
const express = require('express')
const router = new express.Router()
const TravelAgency = require('../models/travelAgency');




router.get('/travelAgency/:id', (req, res) =>{
    res.send('HI WE ARE '+req.params.id+' TOUR OPERATORS')
})

router.post('/travelAgency/signup', async (req, res) =>{

    const travelagency = TravelAgency(req.body)

    try{
        await travelagency.save()
        res.status(201).send(travelagency)
    }
    catch(e){
        res.status(400).send(e)
    }

})





module.exports = router


