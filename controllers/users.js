const express = require('express')
const users = express.Router()
const User = require ("../models/users.js")
const bcrypt = require('bcrypt')

users.get('/new', (req, res)=> {
    //Shows List of Users for now, will eventually change to a "new user" page
    users.get('/', (req,res) => {
        User.find({}, (err, foundBucketLists) => {
            if (err) {
                res.status(400).json({ error: err.message })
            }
            res.status(200).json(foundBucketLists)
        })
    
    })
})

users.post('/', (req, res) => {
    //move user name to lowercase before storing
    req.body.username = req.body.username.toLowerCase()
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    User.create(req.body, (err, createdUser) =>{
        User.findOne(createdUser._id, (error, user) =>{
            return res.json(user)
        })
    })
})

module.exports = users