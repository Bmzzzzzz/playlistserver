const userController = require('../DL/controllers/userController.js')
const{createToken}=require('./jwt')


exports.getUserDetailsById = (id) => {
  // await userController.create({ email: "Yon@walla.com" });
  return userController.read({ _id: id })
  // find
  // check if null or exist
  // return error / user {}
}


exports.getAllusers = async () => {
  const users = await userController.read({});
  if (users.length === 0) throw ({ code: 400, msg: "there is no users" })
  return userController.read({});
};

exports.createUser = async (userFields) => {
  const eUser = await userController.read({ email: userFields.email });
  if (eUser.length) throw ({ code: 400, message: "this user already exist" })

  return await userController.create(userFields)
};


exports.login = async (email, password) => {
  if (!email || !password) throw ({ code: 409, message: "missing data" })
  const eUser = await userController.read({ email: email }, "password");
  if (!eUser.length) throw ({ code: 400, message: "user not found" })
  console.log(eUser);
  if (password !== eUser[0].password) throw ({ code: 503, message: "not auth" })

  const token=createToken(eUser[0]._id)
  return token


}

exports.register = async (userFields) => {
  const eUser = await userController.read({ email: userFields.email });
  if(eUser.length)throw({code:400,massage:"this user already exist"})

  return await userController.create(userFields)
};


exports.updateUser = async (id, newFiled) => {
  return userController.update({ _id: id }, newFiled)
};

exports.del = (id) => {
  return userController.del({ _id: id });

}
// let user1 = {
//     firstName: "Yonatan",
//     lastName: "Ramon",
//     email: "Yokon@walla.com",
//     password: "987865",
//     address: {
//         street: 12,
//         homeNum: 34,
//         city: "jerusalem",
//     },
//     gender: 'male'
// }