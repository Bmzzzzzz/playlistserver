const { songModel } = require('../models/song')

async function create(data){
    return await songModel.create(data);
}

async function read ( filter, proj ){
    return await songModel.find(filter, proj);
}

async function update ( filter, newData ) {
    return await songModel.updateOne(filter, newData);
}

async function del(filter){
    return await update(filter, {isActive: false})
}

async function delet(filter){
    return await songModel.deleteOne(filter);
}
module.exports = { create, read, update, del ,delet }