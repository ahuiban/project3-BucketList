const mongoose = require('mongoose')

const bucketListSchema = mongoose.Schema ({
    listName: {type: String, required: true}, //listname required
    ownerID: String, //who created/owns the list
    items: Array, //list data goes here [cancun, false],[jamaica, true]
    createdDate: {type: Date, default: Date.now} //date created

  
})

module.exports = mongoose.model('BucketList', bucketListSchema)