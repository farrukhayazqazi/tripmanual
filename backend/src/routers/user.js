const { Router } = require('express')
const express = require('express')
const router = new express.Router()




router.get('/users/me', (req, res) =>{
    console.log('Yup! its coding time :)')
    res.send('Hurray! it worked!!!')
})







module.exports = router


