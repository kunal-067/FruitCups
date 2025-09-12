import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        required: true,
        type: Number
    },
    email: {
        type: String
    },
     
    address:String,
    city: String,
    district: String,
    state: String,
    pinCode: Number,
    fType:String,

    password: {
        required: true,
        type: String
    },

    status:{
        type:String,
        enum:['Active','InActive']
    },
    role:{
        type:String,
        enum:['Admin','User'],
        default:'User'
    },
    coins:{
        type:Number,
        default:0
    }
})
export const User = mongoose.models?.User || mongoose.model('User', userSchema)