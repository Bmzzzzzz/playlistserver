const express = require("express");
const router = express.Router();
const playListLogic = require('../BL/playlistLogic')
const { authJWT } = require('../middlware/auth')


router.post("/", authJWT, async (req, res) => {
    try{
      console.log("routh9 ",req.body);
        const playList = await playListLogic.addPlayList(req.body)
        res.send(playList);
    } catch (error) {
        console.log(error);
        if (error.code && error.code < 1000) {
          res.status(error.code).send(error.message)
        } else {
          res.status(500).send("something went wrong")
        }
      }
});

router.get("/", authJWT, async (req, res) => {
    try{
        const playLists = await playListLogic.getAllPlayLists()
        res.send(playLists);
    } catch (error) {
        console.log(error);
        if (error.code && error.code < 1000) {
          res.status(error.code).send(error.message)
        } else {
          res.status(500).send("something went wrong")
        }
      }
});

router.get("/:id", authJWT, async (req, res) => {
    try{
        const playList = await playListLogic.getPlaylistById(req.params.id);
        res.send(playList);
    } catch (error) {
        console.log(error);
        if (error.code && error.code < 1000) {
          res.status(error.code).send(error.message)
        } else {
          res.status(500).send("something went wrong")
        }
      }
});

router.put('/:id', authJWT, async (req, res) => {
  try{
    const savedPlaylist = await playListLogic.updatePlaylist(req.params.id, req.body)
    res.send(savedPlaylist)
  } catch (error) {
    console.log(error);
    if (error.code && error.code < 1000) {
      res.status(error.code).send(error.message)
    } else {
      res.status(500).send("something went wrong")
    }
  }
})

router.put('/add-song/:id', authJWT, async (req, res) => {
  try{
    const savedPlaylist = await playListLogic.addSong(req.params.id, req.body)
    res.send(savedPlaylist)
  } catch (error) {
    console.log(error);
    if (error.code && error.code < 1000) {
      res.status(error.code).send(error.message)
    } else {
      res.status(500).send("something went wrong")
    }
  }
})

router.put('/remove-song/:id', authJWT, async (req, res) => {
  try{
    const savedPlaylist = await playListLogic.removeSong(req.params.id, req.body)
    res.send(savedPlaylist)
  } catch (error) {
    console.log(error);
    if (error.code && error.code < 1000) {
      res.status(error.code).send(error.message)
    } else {
      res.status(500).send("something went wrong")
    }
  }
})

router.get('/get-song/:id', authJWT, async (req, res) => {
  try{
    const savedPlaylist = await playListLogic.getSongById(req.params.id, req.body)
    res.send(savedPlaylist)
  } catch (error) {
    console.log(error);
    if (error.code && error.code < 1000) {
      res.status(error.code).send(error.message)
    } else {
      res.status(500).send("something went wrong")
    }
  }
})

module.exports = router;