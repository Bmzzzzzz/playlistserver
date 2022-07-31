const express = require("express")
const router = express.Router();
const userRouter = require('./userRoute')
const playlistRouter=require('./playlistRoute')


router.use("/users", userRouter)
router.use("/playlists", playlistRouter)

module.exports = router
