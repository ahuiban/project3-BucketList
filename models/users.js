const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = Schema({
    username: String,
    password: String,
    listsCreated: [{type: Schema.Types.ObjectId, ref: 'BucketList'}] //can be used later to associate bucketlists with users
})

const User = mongoose.model('User', userSchema)

module.exports = User