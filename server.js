const express = require('express')
const mongoose = require('mongoose')
const app = express()
const PORT = 3003
const cors = require("cors")
const animalsController = require('./controllers/bucketList.js')

app.use(cors());
app.use(express.json())
app.use('/bucketlist', bucketListController)


mongoose.connection.on('error', err => console.log(err.message + ' is Mongod not running?'))
mongoose.connection.on('disconnected', () => console.log('mongo disconnected'))

mongoose.connect('mongodb://localhost:27017/bucketlist', { useNewUrlParser: true })
mongoose.connection.once('open', ()=>{
    console.log('connected to mongoose...')
})




app.listen(PORT, () => {
    console.log('listening on port', PORT)
})
