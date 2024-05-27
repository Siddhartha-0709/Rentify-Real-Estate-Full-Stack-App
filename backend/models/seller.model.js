import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema({
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
    postedProperties: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "property"
    }
},{timestamps: true});
export const seller = mongoose.model("seller", sellerSchema);
