const userController = require('../DL/controllers/userController.js')
const{createToken}=require('../middlware/jwt')
const bcrypt = require('bcrypt');
const { create } = require('domain');


exports.getUserDetailsById = async (id) => {
  const user = await userController.readOne({ _id: id })
  if (!user) throw ({ code: 404, message: "not found" })
  return user;
}


exports.getAllusers = async () => {
  const users = await userController.read({});
  if (users.length === 0) throw ({ code: 400, msg: "there is no users" })
  return users;
};

exports.createUser = async (userFields) => {
  const eUser = await userController.read({ email: userFields.email });
  if (eUser.length) throw ({ code: 400, message: "this user already exist" })

  return await userController.create(userFields)
};


exports.login = async (email, password) => {

  if (!email || !password) throw ({ code: 409, message: "missing data" })

  const eUser = await userController.readOne({ email: email },["+hashedPassword", "+salt"]);
  if (!eUser) throw ({ code: 400, message: "user not found" })

  const verified = await bcrypt.compare(password, eUser.hashedPassword);
  if (!verified) {throw ({ code: 503, message: "unauthorized" })};

  const token=createToken(eUser._id)
  return token;
  
}

exports.register = async (userFields) => {
  const {email, password, firstName, lastName} = userFields;

  if (!email || !password || !firstName || !lastName)
  throw {code: 400, message: "missing data"};

  const eUser = await userController.readOne({ email: email });
  if(eUser)throw({code:405,massage:"email already exist"})

  const salt =await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  userFields.salt = salt
  userFields.hashedPassword = hashedPassword

  const user= await userController.create(userFields)
  const token = createToken(user._id)
  return token;
};


exports.updateUser = async (id, newFiled) => {
  const updateUser= await userController.update({ _id: id }, newFiled);
  return updateUser;
};

exports.del = async (id) => {
  const delUser = await userController.del({ _id: id });
  return delUser;
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