const express = require('express');
const router = express.Router();
const User = require('../models/users.js')
const session = require('express-session')
const bcrypt = require('bcrypt')

router.get('/new', (req, res) => {
    res.send("<h3>Login to your account</h3>")
})

router.post('/', (req, res)=>{
    User.findOne({ username: req.body.username },(err, foundUser) => {
        if (foundUser == null) {
            console.log("Username not found")
            let userNotFound = true;
        } else  if( bcrypt.compareSync(req.body.password, foundUser.password) ){
            res.status(200).json(foundUser)
        } else {
            res.status(400).json("wrong password")
        }
    });
});

router.delete('/', (req, res) =>{
    req.session.destroy(()=>{
        res.redirect('/')
    })
})

module.exports = router;