const { userModel } = require('../models/user')


async function create(data) {
    return await userModel.create(data);
}

async function read(filter, proj) {
    return await userModel.find(filter, proj);
}

async function readOne(filter, proj) {
    return await userModel.findOne(filter, proj);
}

async function update(filter, newData) {
    return await userModel.findOneAndUpdate(filter, newData,{ new: true });
}

// db.students2.findOneAndUpdate(
//     { _id : 1 },
//     { $set: { "grades.$[elem].mean" : 100 } },
//     { arrayFilters: [ { "elem.grade": { $gte: 85 } } ] }
//  )

async function del(filter) {
    return await update(filter, { isActive: false })
}

module.exports = { create, read, update, del,readOne }
