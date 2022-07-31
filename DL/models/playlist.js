
const mongoose = require('mongoose');
const {SchemaTypes} = mongoose;
require('./user')
//playlistname playlistId userref songs 
//BL-   add remove 

const playListSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: SchemaTypes.ObjectId,
        ref: 'user',
        required: true
    },
    songs:[{
       type: Object
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
