require('dotenv').config()

const express = require('express')
const workoutRoutes = require('./routes/workouts')

// express app
const app = express()

// middleware
app.use(express.json())

app.use((req,res,next) => {

    console.log(req.path,req.method)
    next()
})

// routes
app.use('/api/workouts',workoutRoutes)

// listen to request
app.listen(process.env.PORT,() => {
    console.log(`listening to port: ${process.env.PORT}...`);
})


