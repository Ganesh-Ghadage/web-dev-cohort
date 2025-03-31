import mongoose from 'mongoose'

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("✅ MongoDB conneted successfully")
    } catch (error) {
        throw Error(error)
    }
}


export default connectDB