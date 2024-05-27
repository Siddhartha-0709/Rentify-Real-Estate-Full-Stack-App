import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
  propertyType: {
    enum: ["Apartment", "House", "Villa", "house", "apartment", "villa"],
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl:{
    type: String,
    default:"https://firebasestorage.googleapis.com/v0/b/plantit-416016.appspot.com/o/New%20Project.png?alt=media&token=6b768bda-bb43-4391-9ca9-15da7758bafd"
    },
  isAvailable: {
    type: String,
    enum: ["true", "false"],
    required: true,
  },
  soldBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "seller",
  },
  nearbyLandmarks:{
    type: [String]
  },
  sqftArea: {
    type: String,
    required: true,
  },
  coordinates:{
    latitude:{
        type: String
    },
    longitude:{
        type: String
    }
  },
  pinCode: {
    type: String,
    required: true,
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "buyer",
  }
},{timestamps: true});

export const property = mongoose.model("property", propertySchema);
