const express = require("express")
const router = express.Router();
const userRouter = require('./userRoute')
// const itemRouter=require('./itemRoute')
// const ordresRouter=require('./orderRoute')

router.use("/users", userRouter)
// router.use("/item",itemRouter)
// router.use("/order",ordresRouter)

module.exports = router
