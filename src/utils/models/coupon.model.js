import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({
    code: {
        type: String,
        unique: true,
        required: true,
        uppercase: true,
        trim: true,
    },
    discountType: {
        type: String,
        enum: ["percentage", "fixed"], // percentage = % off, fixed = ₹ off
        required: true,
    },
    discountValue: {
        type: Number,
        required: true,
    },
    minPurchase: {
        type: Number,
        default: 0,
    },
    maxDiscount: {
        type: Number,
    },
    validFrom: {
        type: Date,
        default: Date.now,
    },
    validTill: {
        type: Date,
        required: true,
    },
    usageLimit: {
        type: Number, // total usage across all users
        default: 1,
    },
    usedCount: {
        type: Number,
        default: 0,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true
});

export const Coupon = mongoose.models.Coupon || mongoose.model("Coupon", couponSchema);