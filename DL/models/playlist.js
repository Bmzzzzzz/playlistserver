
const mongoose = require('mongoose');
const {SchemaTypes} = mongoose;
require('./user')
require('./song')


const playListSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        required: true,
        unique: true
    },
    userId: {
        type: SchemaTypes.ObjectId,
        ref: 'user',
        required: true
    },
    songs:[ {
        type: String,
        ref: 'song'
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
