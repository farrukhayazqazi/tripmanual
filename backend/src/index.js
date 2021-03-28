const express = require('express');
const userRoutes = require('./routers/user')
const tripRoutes = require('./routers/trip')
const travelAgencyRoutes = require('./routers/travelAgency')


const app = express();
const port = 5000;


app.use(express.json())
app.use(userRoutes)
app.use(tripRoutes)
app.use(travelAgencyRoutes)

app.listen(port, () =>{
    console.log('Serving up on port '+port)
})