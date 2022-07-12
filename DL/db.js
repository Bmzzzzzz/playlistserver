const mongoose = require('mongoose')

const MONGO_URL = process.env.MONGO_URL

 exports.connect=async()=> {
    try {
        await mongoose.connect(MONGO_URL, { useNewUrlParser: true },(err) => {
                if (err) { throw err }
                console.log("Connection Success, State: ", mongoose.connection.readyState);
            })

    }
    catch (err) {
       
        console.log('error mongoose: ', err);
    }
}
