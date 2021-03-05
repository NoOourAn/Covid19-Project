const express = require('express')
const usersRoutes = require('./routes/users')
const errorRoute = require('./routes/error')
const authMiddleware = require('./middlewares/authMW')
require('./db-conn')
const cors = require('cors'); 

const app = express()
app.use(cors())
const port = 3000


//set up static files
app.use(express.static('public'))  ///by default it heads for public folder

//set up json body parser
app.use(express.json());

//Users Router
app.use('/api/users',usersRoutes)
 

//error route
app.use('**', errorRoute)


app.listen(process.env.PORT || port,()=>{
    console.log(`i am listening on port ${port}`)
})