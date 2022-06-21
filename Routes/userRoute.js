
const express = require("express")
const router = express.Router();
const userLogic = require('../BL/userLogic')
//const auth = require('../middlware/auth')



// router.all('/test', auth, (req, res) => {
//     res.send("test")
// })



router.post("/login", async (req, res) => {
    try {
        const user = await userLogic.login(req.body.email, req.body.password)
        console.log("login");
        res.send("login" + user)
    }
    catch (error) {
        console.log(error);
        res.status(500).send("sorry ,something went wrong login")
    }

})

//router(auth)//chakc if login


router.post("/register", async (req, res) => {
    try {
        const newUser = await userLogic.register(req.body)

        res.send({ n: "register" })
    } catch (error) {
        console.log(error);
        res.status(500).send(error.massage)
    }
})


router.get("/", async (req, res) => {
    console.log("id")
    try {
        const user = await userLogic.getUserDetailsById(req.query.id)
        res.send(user);
    }
    catch (error) {
        console.log(error.msg);

    }

});

router.get("/:id", async (req, res) => {
    console.log("id")
    const user = await userLogic.getUserDetailsById(req.params.id)
    res.send(user);
});
router.get("/all", async (req, res) => {
    try {
        const users = await userLogic.getAllusers();
        res.send(users)
    } catch (error) {
        console.log(error.msg);
        res.status(500).send("sorry ,something went wrong")
    }
});





router.post('/', async (req, res) => {
    const { firstName, lastName, email } = req.body;
    const rest = {
        password: "987865",
        address: {
            street: 12,
            homeNum: 34,
            city: "jerusalem",
        },
        gender: 'male'
    }

    const userFields = { firstName, lastName, email, ...restFields };
    const user = await userLogic.createUser(userFields);
    res.send(user + "new user" + req.firstName + " " + req.lastName + " created")
});



router.put('/edit_user/:id', async (req, res) => {
    const savedUser = await userLogic.updateUser(req.query.id, req.body)
    res.send(savedUser)
})

router.delete("/:id", async (req, res) => {
    const delUser = await userLogic.delete(req.query.id)
    res.send(delUser)
})











// res.send({
//     firstName: "Yonatan",
//     lastName: "Ramon",
//     email: "Yokon@walla.com",
//     password: "987865",
//     address: {
//         street: 12,
//         homeNum: 34,
//         city: "jerusalem",
//     },
//     gender: 'male'
// })

module.exports = router;



