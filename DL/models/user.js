const mongoose = require('mongoose')
const {SchemaTypes} = mongoose
require("./playlist")


const userSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    salt:{
        type: String,
        required: true,
        select: false
    },
    hashedPassword: {
        type: String,
        required: true,
        select: false
    },
    createDate: {
        type: Date,
        default: Date.now
    },
    playlists: [{
            type: SchemaTypes.ObjectId,
            ref: 'playlist'
    }],
    lastlog: {
        type: Date,
        default: Date.now
    },

    isActive: {
        type: Boolean,
        default: true
    }
})

const userModel = mongoose.model('user', userSchema);

module.exports = { userModel }

