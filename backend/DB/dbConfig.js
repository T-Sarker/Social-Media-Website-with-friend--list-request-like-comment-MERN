const mongoose = require('mongoose')


//connecting mongodb
const db = async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.DB_URL_STRING)
        console.log('DB Connection stablished');
    } catch (error) {
        console.log(error);
    }
}

module.exports = db