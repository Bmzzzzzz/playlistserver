const express = require("express")
const router = express.Router();
const userRouter = require('./userRoute')
const playlistRouter=require('./playlistRoute')
const songRouter= require('./songRoute')


router.use("/users", userRouter)
router.use("/playlists", playlistRouter)
router.use('/songs', songRouter)

module.exports = router
