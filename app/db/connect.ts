import 'dotenv/config.js';
import mongoose from 'mongoose';

const uri = process.env.DATABASE_URI;
const connectDB = () => {
    return mongoose.connect(uri)
                   .then(() => {
                        console.log("Successfully connecting to DB");
                   });
}

export default connectDB;
