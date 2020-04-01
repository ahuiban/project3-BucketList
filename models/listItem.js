const mongoose = require('mongoose')

const listItemSchema = mongoose.Schema ({
    itemtName: {type: String, required: true}, //name required
    itemDescription: String,
    itemCategory: String, //ie experience, travel, seasonal, animamal
    itemImageURL: String  
})

module.exports = mongoose.model('ListItem', listItemSchema)