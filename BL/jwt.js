const jwt = require("jsonwebtoken")
const secret = process.env.TOKEN


function createToken(id) {
    const token = jwt.sign({ id }, secret, { expiresIn: "1h" })
    return token
}
console.log(createToken("asas"));


function validateToken(token) {
    return jwt.verify(token, secret)
}
console.log(validateToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFzYXMiLCJpYXQiOjE2NTU4MTU1MjcsImV4cCI6MTY1NTgxOTEyN30.8f16gChednIwkR5LaOo1oVYUfSz_9aZtzg0XdYrXwLs", secret));
module.exports = { createToken, validateToken }