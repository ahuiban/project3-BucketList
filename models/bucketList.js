const mongoose = require('mongoose')

const bucketListSchema = mongoose.Schema ({
    listName: String,
    owner: String,
    breed: String,
    image: {type: String, default: 'https://loremflickr.com/240/120'},
    age: Number,
    adopted: Boolean,
    personalityTraits: [{type: String}]
  
})

module.exports = mongoose.model('BucketList', bucketListSchema)