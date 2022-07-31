
require("dotenv").config()
const express = require('express')
const app = express()
const port = process.env.PORT//on server //need add file .env

app.use(require('cors')())
app.use(express.json())

const router = require('./Routes')
app.use("/api", router) //ניגש אל משתנה 
app.listen(port, () => console.log(`server is running => ${port}`))
require('./DL/db').connect();

//install
//npm i 'express' //ספריה עבור NODE שיהיה יותר קל לפתח את צד השרת
//npm i 'cors'//for security
//npm i dotenv  //
//npm i jsonwebtoken//for create token
//npm i nodemon -D//for devlpoper 
//npm i mongoose


//run
//npm run dev