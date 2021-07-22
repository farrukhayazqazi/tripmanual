const jwt = require('jsonwebtoken')
const User = require('../models/user')
const TravelAgency = require('../models/travelAgency');


const auth = async (req, res, next) => {

    try{
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'finalyearproject')
        // if user
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

        // if travel agency
        const travelagency = await TravelAgency.findOne({ _id: decoded._id , 'tokens.token':token}) 

        if(!user && !travelagency){
            throw new Error()
        }

        if(!travelagency){
            req.token = token
            req.user = user
        }
        else{
            req.token = token
            req.travelagency = travelagency
        }
        
        next()
    }   
    
    catch(e){
        res.status(401).send({ error: 'Please authenticate.' })
    }

}


module.exports = auth