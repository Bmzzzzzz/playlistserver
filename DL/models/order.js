const mongoose = require('mongoose');
const {SchemaTypes} = mongoose
require('./user')
require('./playlists')

const orderSchema = new mongoose.Schema({
    orderDate: {
        type: Date,
        default: Date.now
    },

    totalPrice: {
        type: Number,
        // required: true
    },
    userId: {
        type: SchemaTypes.ObjectId,
        ref: 'user'
    },
    items: [{
        itemId: { type: SchemaTypes.ObjectId, ref: 'item' },
        qty: { type: Number, required: true, default: 1 }
    }],


})


const orderModel = mongoose.model('order', orderSchema);
module.exports = { orderModel }