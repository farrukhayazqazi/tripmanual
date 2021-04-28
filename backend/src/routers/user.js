const { Router } = require('express')
const express = require('express')
const router = new express.Router()
const User = require('../models/user')




router.get('/users/me', (req, res) =>{
    res.send(req.user);
})


router.post('/users/signup', async (req, res) =>{

    console.log(req.body)
    const user = new User(req.body)

    try{
        await user.save();
        res.status(201).send(user);
    }
    catch(e){
        res.status(400).send(e)
    }

})

// router.get('/users/login', async(req, res) =>{
//     const user = await User.findById(req.body.id)
// })









module.exports = router


