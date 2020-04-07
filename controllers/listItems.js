const express = require('express')
const listItems = express.Router()
const ListItem = require ('../models/listItem.js')

//INDEX Route
listItems.get('/', (req,res) => {
    ListItem.find({}, (err, foundBucketLists) => {
        if (err) {
            res.status(400).json({ error: err.message })
        }
        res.status(200).json(foundBucketLists)
    })

})

//EXPANDED INDEX Route
//Given listitem id returns the entire listitem data
listItems.get('/:id', (req,res) => {
    ListItem.findById(req.params.id, (err, foundBucketLists) => {
        if (err) {
            res.status(400).json({ error: err.message })
        }
        res.status(200).json(foundBucketLists)
    })

})

//CREATE ROUTE
listItems.post('/', (req, res) => {
    ListItem.create(req.body, (error, createdItem) => {
        console.log(req.body)
        if (error) {
            res.status(400).json({ error: error.message })
        }
        console.log("item created")
        res.status(200).json(createdItem)
    })
})

//UPDATE ROUTE
listItems.put('/:id', (req, res) => {
    ListItem.findByIdAndUpdate(req.params.id, req.body, {
        new: true }, (err, updatedBucketList) => {
            if (err) {
                res.status(400).json({ error: err.message })
            }
            res.status(200).json({updatedBucketList})
        })
    })

//DELETE ROUTE
listItems.delete('/:id', (req,res) => {
    ListItem.findByIdAndRemove(req.params.id, (err, deletedBucketList) => {
        if (err) {
            res.status(400).json({ error: err.message })
        }
        res.status(200).json(deletedAnimal)
    })
})

//SEED Route
listItems.get('/seed', async (req, res) => {
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
        const seedItems = await ListItem.create(bucketListSampleData)
        res.send(seedItems)
    } catch (err) {
        res.send(err.message)
    }
    res.redirect('/bucklist')
})

module.exports = listItems