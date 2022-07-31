const jwt = require("jsonwebtoken")
const secret = process.env.SECRET_JWT


function createToken(id) {
    const token = jwt.sign({ id }, secret, { expiresIn: "10h" })
    return token
}

function validateToken(token) {
    return jwt.verify(token, secret)
}
module.exports = { createToken, validateToken }