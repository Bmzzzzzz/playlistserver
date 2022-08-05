const jwt = require("jsonwebtoken");
const {getUserDetailsById} = require("../BL/userLogic");

const authJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.SECRET_JWT, (err, verifyToken) => {
            if (err) {
                return res.sendStatus(403);
            }
            req._id = verifyToken.id;
            // console.log("auth id: ", req._id);
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

const adminAuth = async (req, res, next) => {
    const user = await getUserDetailsById(req._id);
    if (user.permission === 'admin') {
        next();
    }
    else return res.sendStatus(403);
}

module.exports = { authJWT , adminAuth }


// fetch("http://localhost:3001/api/users/", {
//     method: "GET",
//     headers: { Authorization: `bearer ${localStorage.storeAccesstoken}` },
//     body: {}

// })

