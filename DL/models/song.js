const mongoose = require('mongoose')
const {SchemaTypes} = mongoose;
require('./playlist')
require('./user')


const songSchema = new mongoose.Schema({

    id: {
        type: String,
        required: true
    },

    userId:{
        type: SchemaTypes.ObjectId,
        ref: 'user',
        required: true
    },

    playlistId:{
        type: SchemaTypes.ObjectId,
        ref: 'playlist',
        required: true
    },

    title: {
        type: String,
        required: true
    },

    url: {
        type: String,
        required: true
    },

    duration_formatted: {
        type: String
    },

    thumbnail: {
        url: {
            type: String
        }
    },

    isActive: {
        type: Boolean,
        default: true
    }

})

const songModel = mongoose.model('song', songSchema)
module.exports = { songModel }