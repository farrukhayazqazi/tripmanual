const mongoose = require('mongoose'); 
  

mongoose.connect( process.env.MONGODB_URL || 'tripmanual-mongodb://127.0.0.1:27017/trip-manual', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

