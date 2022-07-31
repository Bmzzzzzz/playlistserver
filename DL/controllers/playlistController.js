const { playListModel } = require('../models/playlist')


async function create(data) {
    return  await playListModel.create(data);
    
}
async function read(filter, proj) {
   return await playListModel.find(filter, proj);   
}

async function readOne(filter, proj) {
    return await playListModel.findOne(filter, proj);
}

async function update(filter, newData) {
    return await playListModel.updateOne(filter, newData);   
}

async function findAndUpdate(filter, newData, proj) {
    return await playListModel.findOneAndUpdate(filter, newData, proj);   
}

async function del(filter) {
    return await update(filter, { isActive: false });
}

async function delet(data) {
    return  await playListModel.deleteOne({data});
}

module.exports = { create, read, readOne, update, findAndUpdate, del, delet }
