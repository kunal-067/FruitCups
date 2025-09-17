import mongoose from "mongoose"

const orderItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    priceAtPurchase: {
        type: Number,
        required: true
    }, // To handle price changes over time
    size: {
        name: String,
        value: Number
    },
    customizations: {
        fruits: [{
            name: String,
            price: Number,
            id: String
        }],
        toppings: [{
            name: String,
            price: Number,
            id: String
        }]
    },
    name: {
        type: String
    }, 
    image:String
});
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
const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    products: [orderItemSchema],
    totalPrice: {
        type: Number,
        required: true
    },
    finalPrice: {
        type: Number,
        required: true
    },
    couponsApplied: [{
        name: String,
        value: {
            type: String,
            required: true
        },
        discount: {
            type: Number,
            required: true
        }
    }],
    payment: {
        method: {
            type: String,
            enum: ['cod', 'upi', 'card']
        },
        status: {
            type: String,
            enum: ['pending', 'success', 'rejected'],
            default: 'pending'
        },
        upiApp:String,
        upiId: String,
        card: {
            no:Number,
        }
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'cancelled'],
        default: 'pending'
    },
    address:addressSchema,
    deliveryWithin: Number,
    deliveredAt: Date
}, {
    timestamps: true
})

orderSchema.pre('validate', function (next) {
    if (!this.products?.length) {
        return next(new Error("Order must contain at least one product"));
    }
    if (this.payment.method === 'upi' && !this.payment.upiId) {
        return next(new Error("UPI ID required for UPI payments"));
    }
    if (this.payment.method === 'card' && !this.payment.card) {
        return next(new Error("Card info required for card payments"));
    }
    next();
});


export const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);