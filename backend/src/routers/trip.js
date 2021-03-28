const { Router } = require('express')
const express = require('express')
const router = new express.Router()




router.get('/trip/:id', (req, res) =>{
    console.log('Yup! its coding time :)')
    res.send('WE ARE IN '+req.params.id)
})






module.exports = router


