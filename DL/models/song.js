const mongoose = require('mongoose')
const {SchemaTypes} = mongoose;
require('./playlist')


const songSchema = new mongoose.Schema({

    id: {
        type: String,
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

    duration: {
        type: String
    },

    thumbnail: {
        type: String
    },

    isActive: {
        type: Boolean,
        default: true
    }

})

const songModel = mongoose.model('song', songSchema)
module.exports = { songModel }