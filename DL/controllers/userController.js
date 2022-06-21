require('../db').connect();

const { userModel } = require('../models/user')

async function create(data) {
    return await userModel.create(data);
}

async function read(filter, proj) {
    return await userModel.find(filter, proj);
}

async function update(filter, newData) {
    return await userModel.findOneAndUpdate(filter, newData,{ new: true });
}

async function del(filter) {
    return await update(filter, { isActive: false })
}

async function readOne(filter, proj) {
    return await userModel.findOne(filter, proj);
}

module.exports = { create, read, update, del,readOne }



// create(user1)