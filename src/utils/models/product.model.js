import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    nutrients: [{
        name: String,
        quantity: Number,
    }],
    description: String,
    images: [{
        url: String,
        position: {
            type: Number,
            default: 0
        }
    }],
    type:{
        type:String,
        enum:['fruit','shake','dry-fruit']
    }
})

export const Product = mongoose.models?.Product || mongoose.model('Product', productSchema)