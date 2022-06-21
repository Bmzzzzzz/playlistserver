//npm init //יוצר קובץ הגדרות לאפליקצייה 
//npm i mongoose //יוצר תקייה של node_modules שנקראת MONGOOSE
const mongoose = require('mongoose') //  import mongoose from 'mongoose' דומה ל
// import mongoose from 'mongoose'
const MONGO_URL = 'mongodb+srv://bezalel:025834297@cluster0.hiacn.mongodb.net/playlistangel?retryWrites=true&w=majority'

 exports.connect=async()=> {//try catch //ניהול שגיאות 
    try {
        await mongoose.connect(MONGO_URL, { useNewUrlParser: true },(err) => {
                if (err) { throw err }
                console.log("Connction Succes", mongoose.connection.readyState);
            }) //mongoose.connection.readyState//בודק את מצב ההתחבורת 

    }
    catch (err) {
       
        console.log('error mongoose: ', err);
    }
}

//module.exports = async()=>{}
// connect();
//mongodb+srv://bezalel:<025834297>@cluster0.hiacn.mongodb.net/שם הדטא בייס?retryWrites=true&w=majority

// node .\db.js // להפעיל את הקובץ בטרמינל