
const express = require("express")
const router = express.Router();
const userRouter = require('./userRoute')
// const itemRouter=require('./itemRoute')


router.use("/user", userRouter)gi
// router.use("/item",itemRouter)


module.exports = router