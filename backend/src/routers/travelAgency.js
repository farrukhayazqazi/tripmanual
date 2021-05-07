const { Router } = require('express')
const express = require('express')
const router = new express.Router()
const TravelAgency = require('../models/travelAgency');
const User = require('../models/user');
const auth = require('../middleware/auth')




router.get('/travelAgency/:id', (req, res) =>{
    res.send('HI WE ARE '+req.params.id+' TOUR OPERATORS')
})

router.post('/travelAgency/signup', async (req, res) =>{

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


router.post('/travelAgency/login', auth, async (req, res) =>{
    

    try{
        const travelagency = await TravelAgency.findByCredentials(req.body.email, req.body.password)
        const token = await travelagency.generateAuthToken()
        res.send({ travelagency, token })
    }
    catch(e){
        res.status(404).send()
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



module.exports = router


