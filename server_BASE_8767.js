require('dotenv').config();


const express = require('express')
const mongoose = require('mongoose')
const app = express()
const PORT = process.env.PORT || 3003
const cors = require("cors")

app.use(cors());
app.use(express.json())

//required controllers
const bucketListController = require('./controllers/bucketLists.js')
app.use('/bucketlists', bucketListController)

const usersController = require('./controllers/users.js')
app.use('/users', usersController)




//MONGOOSE
const MONGODB_URI = process.env.MONGODB_URI || 'heroku link goes here'

mongoose.connection.on('error', err => console.log(err.message + ' is Mongod not running?'))
mongoose.connection.on('disconnected', () => console.log('mongo disconnected'))

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
mongoose.connection.once('open', ()=>{
    console.log('connected to mongoose...')
})

//Redirect
app.get('/', (req,res) =>{
    res.redirect('/bucketlists')
})

app.listen(PORT, () => {
    console.log('listening on port', PORT)
})
