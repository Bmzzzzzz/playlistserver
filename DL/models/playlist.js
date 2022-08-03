
const mongoose = require('mongoose');
const {SchemaTypes} = mongoose;
require('./user')
//playlistname playlistId userref songs 
//BL-   add remove 
//songs - id, title, url, duration-formated ,thumbnail.url 

const playListSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    // id: {
    //     type: String,
    //     required: true,
    //     unique: true
    // },
    userId: {
        type: SchemaTypes.ObjectId,
        ref: 'user',
        required: true
    },
    songs:[{
       title: String,
       id: String,
       url: String,
       duration: String,
       thumbnail: String
        }
    ],
    // img: {
    //     type: String,
    // },
    // description: {
    //     type: String,
    // },
    // category: {
    //     type: String
    // },
    createDate: {
        type: Date,
        default: Date.now
    },
    isActive: {
        type: Boolean,
        default: true
    },
})


const playListModel = mongoose.model('playList', playListSchema);
module.exports = { playListModel }
