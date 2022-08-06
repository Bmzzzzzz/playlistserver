const userController = require('../DL/controllers/userController.js')
const{createToken}=require('../middlware/jwt')
const bcrypt = require('bcrypt');


exports.createUser = async (userFields) => {
  const eUser = await userController.read({ email: userFields.email });
  if (eUser.length) throw ({ code: 400, message: "this user already exist" })

  return await userController.create(userFields)
};

exports.register = async (userFields) => {
  const {email, password, firstName, lastName, playlists} = userFields;

  if (!email || !password || !firstName || !lastName)
  throw {code: 400, message: "missing data"};

  const eUser = await userController.readOne({ email: email });
  if(eUser)throw({code:405,massage:"email already exist"})

  if (!playlists) userFields.playlists = [];
  
  const salt =await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  userFields.salt = salt
  userFields.hashedPassword = hashedPassword

  const user= await userController.create(userFields)
  const token = createToken(user._id)
  return token;
};

exports.login = async (email, password) => {

  if (!email || !password) throw ({ code: 409, message: "missing data" })

  const eUser = await userController.readOne({ email },["+hashedPassword", "+salt"]);
  if (!eUser) throw ({ code: 400, message: "user not found" })
  console.log("🚀 ~ file: userLogic.js ~ line 38 ~ login ~ user", eUser)

  const verified = await bcrypt.compare(password, eUser.hashedPassword);
  if (!verified) {throw ({ code: 403, message: "unauthorized" })};

  const token=createToken(eUser._id)
  return token;
  
}

exports.getAllusers = async () => {
  const users = await userController.read({});
  if (users.length === 0) throw ({ code: 400, msg: "there is no users" })
  return users;
};

exports.getUserDetailsById = async (_id) => {
  const user = await userController.readOne({ _id })
  if (!user) throw ({ code: 404, message: "user not found" })
  return user;
}

exports.updateUser = async (id, newFiled) => {
  console.log("userlogic 61: ", id, newFiled);
  const updateUser= await userController.update({ _id: id }, newFiled);
  return updateUser;
};

exports.del = (id) => {
  return userController.del({ _id: id });

}
