import mongoose from "mongoose"

const orderItemSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true, min: 1 },
  priceAtPurchase: { type: Number, required: true }, // To handle price changes over time
  customizations: {
    fruits: [{ type: String }],
    toppings: [{ type: String }],
    size: { type: String, enum: ['small', 'medium', 'large'], default: 'medium' },
  },
  name: { type: String }, // e.g., "Mango Cup" or "Custom Fruit Cup"
});


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
    couponsApplied:[String],
    status: {
        type: String,
        enum: ['pending', 'completed', 'cancelled'],
        default: 'pending'
    },
    address: {
        type: String,
        required: true
    },
    deliveryWithin:Number,
    deliveredAt:Date
}, {
    timestamps: true
})

export const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);