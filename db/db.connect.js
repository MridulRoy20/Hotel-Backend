const mongoose = require("mongoose");
require("dotenv").config();

const mongoUri = process.env.MONGODB;

const initializeDatabase = async () =>{
    await mongoose.connect(mongoUri).then(()=> console.log("Connected to the DB.")
    )
    .catch((error) => console.log("Error while connecting to DB.", error)
    )
}
module.exports = {initializeDatabase}