import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, "product name must be provided"]
    },
    price : {
        type : Number,
        required : [true, "product price must be provide"]
    },
    featured : {
        type : Boolean,
        default : false
    },
    createdAt : {
        type : Date,
        default : () => new Date()
    },
    company : {
        type : String,
        enum : {
            values : ['ikea', 'liddy', 'caressa', 'marcos'],
            message : '{VALUE} is not supported'
        }
    },
    rating : {
        type : Number,
        default : 4.5
    },
})

export default mongoose.model('Product', productSchema)