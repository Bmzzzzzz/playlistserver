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
  
router.delete('/:id/:playlistId', authJWT, async (req, res) => {
  try{
    const delitedSong = await songLogic.removeSong(req.params.id, req.params.playlistId)
    res.send(delitedSong)
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

router.get('/userSongs', authJWT, async (req, res) => {
  try{
    const songs = await songLogic.getUserSongs(req._id)
    res.send(songs)
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

router.get('/allSongsInPlaylist/:playlistId', authJWT, async (req, res) => {
  try{
    const songs = await songLogic.getPlaylistSongs(req.params.playlistId)
    res.send(songs)
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

router.get('/:id', authJWT, async (req, res) => {
  try{
    const savedSong = await songLogic.getSongById( req.params.id)
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