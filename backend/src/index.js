const express = require('express');
require('./db/mongoose')
const userRoutes = require('./routers/user')
const tripRoutes = require('./routers/trip')
const travelAgencyRoutes = require('./routers/travelAgency')
const cors = require("cors")


const app = express();
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())
app.use(userRoutes)
app.use(tripRoutes)
app.use(travelAgencyRoutes)

app.listen(port, () =>{
    console.log('Serving up on port '+port)
})