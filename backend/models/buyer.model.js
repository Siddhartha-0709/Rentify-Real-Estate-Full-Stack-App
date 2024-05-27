import mongoose from "mongoose";

const buyerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    interestedProperties:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: "property"
    },
    likedProperties:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: "property"
    }
},{timestamps: true});
export const buyer = mongoose.model("buyer", buyerSchema);