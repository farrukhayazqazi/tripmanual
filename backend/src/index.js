const express = require('express');
require('./db/mongoose')
const userRoutes = require('./routers/user')
const tripRoutes = require('./routers/trip')
const travelAgencyRoutes = require('./routers/travelAgency')
const adminRoutes = require('./routers/admin')
const cors = require("cors")


const app = express();
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json({ limit: '50mb' }))
app.use(userRoutes)
app.use(tripRoutes)
app.use(adminRoutes)
app.use(travelAgencyRoutes)


if(process.env.NODE_ENV === "production"){
    app.use(express.static('frontend/build'))
}


app.listen(port, () =>{
    console.log('Serving up on port '+port)
})