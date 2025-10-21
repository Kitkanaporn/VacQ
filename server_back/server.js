const express = require('express');
const dotenv = require('dotenv') ;
const cookieParser = require('cookie-parser') ;

const cors = require('cors') ;

//Load env vars
dotenv.config({path:'./config/config.env'}) ;

const connectDB = require('./config/db') ; //import connectDB function
connectDB() ; //call connectDB function

//define hospital routes
const hospitals = require('./routes/hospitals') ;
const auth = require('./routes/auth') ;
const appointments = require('./routes/appointments') ;

const app = express() ;

app.use(cors()) ;
app.use(express.json()) ; //middleware to accept json data
app.use(cookieParser()) ;
app.use('/api/v1/hospitals' , hospitals) ;
app.use('/api/v1/auth' , auth) ;
app.use('/api/v1/appointments' , appointments) ;
app.set('query parser', 'extended');


const PORT = process.env.PORT || 5000 ;
const server = app.listen(PORT, console.log("Server running in " , process.env.NODE_ENV , "mode on port" , PORT )) ;

//HAndle unhandled promise rejections
process.on('unhandledRejection' , (err , promise) => {
    console.log(`Error: ${err.message}`) ;
    //Close server & exit process
    server.close(() => process.exit(1)) ;
});