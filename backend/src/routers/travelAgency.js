const { Router } = require('express')
const express = require('express')
const router = new express.Router()




router.get('/travelagency/:id', (req, res) =>{
    res.send('HI WE ARE '+req.params.id+' TOUR OPERATORS')
})






module.exports = router


