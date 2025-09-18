import mongoose from "mongoose";
const schedule = new mongoose.Schema({
    day: {
        type: String,
        enum: ['sunday', 'monday', 'tuesday', 'wednesday','thursday','friday', 'saturday'],
        required: true
    },
    fruits: [String],
    toppings: [String],
    cupName: {
        type: String,
        required: true
    },
    skip: {
        type: Boolean,
        default: false
    },
    cupImage:String
})
const membershipSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true, // one active membership per user
    },
    plan: {
        type: String,
        enum: ["basic", "standard", "premium"],
        required: true,
    },
    planId:{
        type:String,
        enum:['#PLAN1','#PLAN2','#PLAN3'],
        required:true
    },
    slot: {
        type: String,
        enum: ['morning', 'evening'],
        default: 'morning'
    },
    billing: {
        type: String,
        enum: ['weekly', 'monthly', 'quarterly'],
        default: 'monthly'
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
    status: {
        type: String,
        enum: ['active', 'paused', 'expired'],
        default: 'active'
    },
    skips: [{
        skippedAt: {
            type: Date,
            default: Date.now
        },
        day:String,
        cupName: String
    }],
    schedule: [schedule],

    deliveredDays: [{
        day: {
            type: String,
            enum: ['sunday', 'monday', 'tuesday', 'wednsday', 'saturday'],
            required: true
        },
        fruits: [String],
        toppings: [String],
        cupName: {
            type: String,
            required: true
        },
        date:Date
    }]
}, {
    timestamps: true
});

export const Membership = mongoose.models.Membership || mongoose.model("Membership", membershipSchema);