const express = require('express')
const bucketLists = express.Router()
const BucketList = require ('../models/bucketList.js')

//INDEX Route
bucketLists.get('/', (req,res) => {
    BucketList.find({}, (err, foundBucketLists) => {
        if (err) {
            res.status(400).json({ error: err.message })
        }
        res.status(200).json(foundBucketLists)
    })

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

//SEED Route
bucketLists.get('/seed', async (req, res) => {
    const bucketListSampleData =
    [
        {
            listName: "sample list 1",
            ownerID: "Jay",
            items: "berlin"
        },
        {
            listName: "sample list 2",
            ownerID: "user1",
            items: ["toyko", "paris"]
        },
        {
            listName: "sample list 3",
            ownerID: "333333335",
            items: ["hawaii", "tahiti", "galapagos"]
        }
    ]

    try {
        const seedItems = await BucketList.create(bucketListSampleData)
        res.send(seedItems)
    } catch (err) {
        res.send(err.message)
    }
    res.redirect('/bucklist')
})

module.exports = bucketLists