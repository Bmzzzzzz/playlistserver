const express = require("express")
const router = express.Router();
const userLogic = require('../BL/userLogic')
const { authJWT } = require('../middlware/auth')


router.post("/register", async (req, res) => {
    try {
        const token = await userLogic.register(req.body)
        res.status(200).send({ token })

    } catch (error) {
      console.log(error);
        res.status(error.code).send(error.massage)
    }
})

router.post("/login", async (req, res) => {
  try {
        const user = await userLogic.login(req.body.email, req.body.password)
        res.send(user)
    }
    catch (error) {
      console.log(error);
      res.status(error.code).send(error.message)
    }
})


router.get("/", authJWT, async (req, res) => {
    try {
      const user = await userLogic.getUserDetailsById(req._id)
        res.send(user);
    
      } catch (error) {
    console.log("get", error);
    if (error.code && error.code < 1000) {
      res.status(error.code).send(error.message)
    } else {
      res.status(500).send("something went wrong")
    }
  }
});

router.get("/:id", authJWT, async (req, res) => {
    try{
        const user = await userLogic.getUserDetailsById(req.params.id)
        res.send(user);
    } catch (error) {
      console.log("get", error);
      if (error.code && error.code < 1000) {
        res.status(error.code).send(error.message)
        } else {
          res.status(500).send("something went wrong")
        }
      }
});

router.get("/all", authJWT, async (req, res) => {
  try {
        const users = await userLogic.getAllusers();
        res.send(users)
    } catch (error) {
      console.log("get", error);
      if (error.code && error.code < 1000) {
          res.status(error.code).send(error.message)
        } else {
          res.status(500).send("something went wrong")
        }
      }
    });
    
    router.put('/:id', authJWT, async (req, res) => {
      const savedUser = await userLogic.updateUser(req.params.id, req.body)
    res.send(savedUser)
  })
  
  router.delete("/:id", authJWT, async (req, res) => {
    const delUser = await userLogic.delete(req.query.id)
    res.send(delUser)
  })

  module.exports = router;
  
  // router.get('/getme', async (req, res) => {
  //   const x= await require('../DL/controllers/userController').read({_id: "62e6dae593e8160d23c82cc2"},"playlists")
  //   res.send(x[0])
  // })
  
  
  