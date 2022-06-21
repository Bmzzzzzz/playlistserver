require('../db').connect();

const { itemModel } = require('../models/item')

async function create(data) {
    return  await itemModel.create(data);
    
}
async function read(filter, proj) {
    return await itemModel.find(filter, proj);
    
}
async function update(filter, newData) {
    return await itemModel.updateOne(filter, newData);
   
}


module.exports = { create, read, update }




//create(item1)