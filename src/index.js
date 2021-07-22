const express = require('express');
require('./db/mongoose')
const userRoutes = require('./routers/user')
const tripRoutes = require('./routers/trip')
const travelAgencyRoutes = require('./routers/travelAgency')
const adminRoutes = require('./routers/admin')
const cors = require("cors")
const path = require('path')


const app = express();
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json({ limit: '50mb' }))
app.use(userRoutes)
app.use(tripRoutes)
app.use(adminRoutes)
app.use(travelAgencyRoutes)


if(process.env.NODE_ENV === 'production'){


    // Serve static files from the React frontend app
    app.use(express.static(path.join(__dirname, '../frontend/build')))

    // AFTER defining routes: Anything that doesn't match what's above, send back index.html; (the beginning slash ('/') in the string is important!)
    app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/../frontend/build/index.html'))
    })
}


app.listen(port, () =>{
    console.log('Serving up on port '+port)
})