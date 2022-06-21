
require("dotenv").config()
const router = require('./Routes')
const express = require('express')
const app = express()
const port = process.env.PORT//on server //need add file .env

app.use(express.json())
app.use(require('cors')())

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