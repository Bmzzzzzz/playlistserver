
require('../db').connect()
const mongoose = require('mongoose')

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
    address: {
        street: { type: String },
        homeNumber: { type: Number },
        city: { type: String }
    },

    gender: {
        type: String,
        enum: ['male', 'famle']
    },
    lastlog: {
        type: Date,
        default: Date.now
    },

    // token: {
    //     type: String,
    //     required: false,
    //     select: false
    // },
    isActive: {
        type: Boolean,
        default: true //הנתון הדיפולטבי שיכנס 
    }
})

const userModel = mongoose.model('user', userSchema);

module.exports = { userModel }


//
//מפעיל את הUSER
