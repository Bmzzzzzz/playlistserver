const express = require('express')
const router = express.Router()
const { authJWT } = require('../middlware/auth')
const songLogic = require('../BL/songLogic')


router.post('/', authJWT, async (req, res) => {
    try{
      const savedSong = await songLogic.addSong( req.body)
      res.send(savedSong)
    } 
    catch (error) {
      console.log(error);
      if (error.code && error.code < 1000) {
        res.status(error.code).send(error.message)
      } else {
        res.status(500).send("something went wrong")
      }
    }
})
  
router.delete('/remove-song/:id', authJWT, async (req, res) => {
  try{
    const savedSong = await songLogic.removeSong(req.params.id, req.body)
    res.send(savedSong)
  } 
  catch (error) {
    console.log(error);
    if (error.code && error.code < 1000) {
      res.status(error.code).send(error.message)
    } else {
      res.status(500).send("something went wrong")
    }
  }
})

router.get('/:playlistId/:id', authJWT, async (req, res) => {
  try{
    const savedSong = await songLogic.getSongById(req.params.playlistId, req.params.id)
    res.send(savedSong)
  } 
  catch (error) {
    console.log(error);
    if (error.code && error.code < 1000) {
      res.status(error.code).send(error.message)
    } else {
      res.status(500).send("something went wrong")
    }
  }
})

module.exports = router;