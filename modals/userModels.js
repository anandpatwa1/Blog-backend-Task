const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, 'please fill name']
    },
    email: {
        type: String,
        require: [true, 'please fill email'],
        unique: true
    },
    password: {
        type: String,
        require: [true, 'please fill password']
    }
})

module.exports = mongoose.model('AnimeUser', userSchema)             