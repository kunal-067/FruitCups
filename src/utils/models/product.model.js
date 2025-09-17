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
    discount:{
        type:String,
        default:0
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
        },
        portrait:String,
        landScape:String,
    }],
    highlighs:[String],
    ingridients:[String],
    tag:String,  //slogons like energy booster, emunity booster etc
    type: {
        type: String,
        enum: ['fruit', 'shake', 'dry-fruit']
    }
}, {
    timestamps: true
})

export const Product = mongoose.models?.Product || mongoose.model('Product', productSchema)