import mongoose from "mongoose";

const addressSchema = {
    houseNo: {
        type: Number
    },
    street: {
        type: String,
        trim: true
    },
    city: {
        type: String,
        trim: true
    },
    district: {
        type: String,
        trim: true
    },
    state: {
        type: String,
        trim: true
    },
    postalCode: {
        type: String,
        trim: true
    },
    country: {
        type: String,
        default: 'India'
    },

    landMark: {
        type: String,
        trim: true
    }
}

const cartItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
        default: 1,
    },
    priceAtAdd: {
        type: Number,
        required: true,
    },
    customizations: {
        fruits: [{
            name: {
                type: String
            },
            quantity: Number,
            price: Number
        }],
        toppings:[{
            name: {
                type: String
            },
            quantity: Number,
            price: Number
        }],
        size: {
            type: String,
            enum: ["small", "medium", "large"],
            default: "medium",
        },
    },
});

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
    },
    email: {
        type: String,
        // unique: true,
        lowercase: true,
        // match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email'],
        sparse: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        select: false, // Exclude from query results by default
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    coins: {
        type: Number,
        default: 0, // For referral rewards or discounts
        min: 0,
    },
    referrals: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // References other users referred by this user
    }],
    phone: {
        type: String,
        required: [true, 'Phone is required'],
        match: [/^\+?[1-9]\d{9,14}$/, 'Please enter a valid phone number']
    },
    address: addressSchema,

    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
    }],
    isVerified: {
        type: Boolean,
        default: false, // For email or OTP verification
    },

    subscriptions: [{
        type: mongoose.Schema.Types.ObjectId,
        status: {
            type: String,
            enum: ['Active', 'InActive'],
            default: 'Active'
        }
    }],
    refreshToken: {
        value: {
            type: String,
            select: false
        },
        lastRefresh: {
            type: Date,
            select: false
        },
    },
    cart: [cartItemSchema]
}, {
    timestamps: true
});

export const User = mongoose.models?.User || mongoose.model('User', userSchema)