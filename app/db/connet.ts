import 'dotenv/config.js'

const databaseURI = process.env.DATABASE_URI
import mongoose from 'mongoose'
function connectDB() {
    return mongoose.connect(databaseURI)
                   .then(() => console.log(`Have connected to DB`))
}

export default connectDB