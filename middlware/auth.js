const {validateToken}=require('./jwt')
const{readOne}=require('../DL/controllers/userController')
async function auth(req,res,next){
const token=req.headers.authorization
//verify token
try{
const decode=validateToken(token)
const eUser=await readOne({_id:decode.id})
if(!eUser)throw""
next()
}catch(error){
    res.status(503).send({message:"not auth"})

}

}
module.exports=auth