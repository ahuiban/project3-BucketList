const express = require('express')
const mongoose = require('mongoose')
const app = express()
const PORT = 3003
const cors = require("cors")

//required controllers
const bucketListController = require('./controllers/bucketLists.js')
app.use('/bucketlists', bucketListController)

const usersController = require('./controllers/users.js')
app.use('/users', usersController)


app.use(cors());
app.use(express.json())



mongoose.connection.on('error', err => console.log(err.message + ' is Mongod not running?'))
mongoose.connection.on('disconnected', () => console.log('mongo disconnected'))

mongoose.connect('mongodb://localhost:27017/bucketlist', { useNewUrlParser: true })
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
