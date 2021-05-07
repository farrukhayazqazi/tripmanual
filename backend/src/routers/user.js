const { Router } = require('express')
const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const auth = require('../middleware/auth')



// read the user data
router.get('/users/me', (req, res) =>{
    res.send(req.user);
})


// register or signup a new user
router.post('/users/signup', async (req, res) =>{

    console.log(req.body)
    const user = new User(req.body)

    try{
        await user.save();
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token });
    }
    catch(e){
        res.status(400).send(e)
    }

})


// to login 
router.post('/users/login', auth, async (req, res) =>{
    

    try{
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    }
    catch(e){
        res.status(404).send()
    }
})


// logout
router.post('/users/logout', auth, async(req, res) =>{
   
    try{
        req.user.tokens = req.user.tokens.filter((token) =>{
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    }
    
    catch(e){

        res.status(500).send()
    }
})












module.exports = router


