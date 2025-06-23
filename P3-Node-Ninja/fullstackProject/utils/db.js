import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

function connectDB() {
    mongoose.connect(`${process.env.MONGO_URI}/cohort-auth`)
    .then(() => {
        console.log('Connected to mongo db')
    })
    .catch((err) => {
        console.log('Error connecting to database', err)
    })
}

export default connectDB