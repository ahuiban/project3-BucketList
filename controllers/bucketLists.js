const express = require('express')
const bucketLists = express.Router()
const BucketList = require ('../models/bucketList.js')

//INDEX Route
bucketLists.get('/', (req,res) => {
        console.log("hello world")
  

})

//CREATE ROUTE
bucketLists.post('/', (req, res) => {
    BucketList.create(req.body, (error, createdBucketList) => {
        if (error) {
            res.status(400).json({ error: error.message })
        }
        res.status(200).json(createdBucketList)
    })
})

//UPDATE ROUTE
bucketLists.put('/:id', (req, res) => {
    BucketList.findByIdAndUpdate(req.params.id, req.body, {
        new: true }, (err, updatedBucketList) => {
            if (err) {
                res.status(400).json({ error: err.message })
            }
            res.status(400).json(updatedBucketList)
        })
    })

//DELETE ROUTE
bucketLists.delete('/:id', (req,res) => {
    BucketList.findByIdAndRemove(req.params.id, (err, deletedBucketList) => {
        if (err) {
            res.status(400).json({ error: err.message })
        }
        res.status(200).json(deletedAnimal)
    })
})

module.exports = bucketLists