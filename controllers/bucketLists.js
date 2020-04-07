const express = require('express')
const bucketLists = express.Router()
const BucketList = require ('../models/bucketList.js')
//const ListItem = require ('../models/listItem.js')

//HOME Route
bucketLists.get('/', (req,res) => {
    BucketList.find({}, (err, foundBucketLists) => {
        if (err) {
            res.status(400).json({ error: err.message })
        }
        res.status(200).json(foundBucketLists)
    })

})

/*
//GET ROUTE EXPANDED
//returns listItems for given bucketlist id
let results = []
bucketLists.get('/:id', (req,res) => {
    BucketList.findById(req.params.id, (err, foundBucketLists) => {
        console.log(foundBucketLists)
        foundBucketLists.items.map(item => {
            ListItem.findById(item, (err, foundListItems) => {
                if (err) {
                    res.status(400).json({ error: err.message })
                }
                //console.log(foundListItems)
                results.push(foundListItems)
                console.log("results are: ", results)
                
            })
        })

    })
    console.log("final results are: ",results)
    res.status(200).json(results)
})
*/

//GET ROUTE EXPANDED
//returns listItems for given bucketlist id

/*
bucketLists.get('/:id', (req,res) => {
    let results = []
    BucketList.findById(req.params.id, (err, foundBucketLists) => {
        if (err) {
            res.status(400).json({ error: err.message })
        }

    }).then(fBucketLists => {
        fBucketLists.items.map(item => {
            ListItem.findById(item, (err, foundListItems) => {
                if (err) {
                    res.status(400).json({ error: err.message })
                }
                //console.log(foundListItems)
                results.push(foundListItems)
                console.log("results are: ", results)
            })
        })
    }).then(doneResults => {
        console.log("final results are: ",results)
        res.status(200).json(results)
    })
})
*/


/*
//GET ROUTE EXPANDED
//returns listItems id's for given bucketlist id
bucketLists.get('/:id', (req,res) => {
    let results = []

    BucketList.findById(req.params.id, (err, foundBucketLists) => {
        if (err) {
            res.status(400).json({ error: err.message })
        }
        res.status(200).json(foundBucketLists)
    })
})
*/

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
            res.status(200).json({updatedBucketList})
        })
    })

//EXPANDED UPDATE ROUTE
//pushes listitem in bucketlist
bucketLists.put('/pushItem/:id', (req, res) => {
    BucketList.findByIdAndUpdate(req.params.id, 
        {
            $push:
        {
            items:
                
                    req.body.listItemID
        
            }
        },
        {new: true }, (err, updatedBucketList) => {
            if (err) {
                res.status(400).json({ error: err.message })
            }
            res.status(200).json({updatedBucketList})
        })
    })

//DELETE ROUTE
bucketLists.delete('/:id', (req,res) => {
    BucketList.findByIdAndRemove(req.params.id, (err, deletedBucketList) => {
        if (err) {
            res.status(400).json({ error: err.message })
        }
        res.status(200).json(deletedBucketList)
    })
})

//SEED Route
bucketLists.get('/seed', async (req, res) => {
    const bucketListSampleData =
    [
        {
            listName: "new sample list 1",
            ownerID: "Jay",
            items: [{
                itemName: "Berlin",
                itemDescription: "",
                itemCategory: "Places",
                itemImageURL: "",
                isCompleted: false  
            }]
        },
        {
            listName: "newsample list 2",
            ownerID: "user1",
            items: [{
                itemName: "Tokyo",
                itemDescription: "",
                itemCategory: "Places",
                itemImageURL: "",
                isCompleted: false  
            },
            {
                itemName: "Paris",
                itemDescription: "",
                itemCategory: "Places",
                itemImageURL: "",
                isCompleted: true  
            }]
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