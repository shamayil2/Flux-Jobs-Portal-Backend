const mongoose = require("mongoose")

require("dotenv").config()

const mongoUri = process.env.MONGODB;

const initializeDatabase = async() => {

    try {
        await mongoose.connect(mongoUri)
            .then(() => console.log("Database is connected"))
            .catch((error) => console.log("Error Occured while connecting", error))

    } catch (error) {
        console.log("Database failed to connect", error)
    }

}

module.exports = initializeDatabase;