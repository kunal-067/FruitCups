import mongoose from "mongoose";

const membershipSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true, // one active membership per user
    },
    plan: {
        type: String,
        enum: ["basic", "premium", "gold"],
        required: true,
    },
    startDate: {
        type: Date,
        default: Date.now,
    },
    endDate: {
        type: Date,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    benefits: {
        freeDelivery: {
            type: Boolean,
            default: false
        },
        discountPercent: {
            type: Number,
            default: 0
        },
    },
}, {
    timestamps: true
});

export const Membership = mongoose.models.Membership || mongoose.model("Membership", membershipSchema);