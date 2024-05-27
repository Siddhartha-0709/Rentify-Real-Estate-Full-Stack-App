import { buyer } from "../models/buyer.model.js";
import { property } from "../models/property.model.js";
import { seller } from "../models/seller.model.js";
const registerBuyer = async (req, res) => {
    const { firstName, lastName, email, password, phoneNumber } = req.body;
    if (!firstName || !lastName || !email || !password || !phoneNumber) {
        return res.status(400).json({ error: "Please fill all the fields" });
    }
    try {
        const user = await buyer.findOne({ email });
        if (user) {
            return res.status(409).json({ error: "User already exists" });
        }
        const newBuyer = new buyer({
            firstName,
            lastName,
            email,
            password,
            phoneNumber
        });
        await newBuyer.save();
        res.status(201).json({ message: "New Buyer Registered Successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error while registering new buyer" });
    }
}
const loginBuyer = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "Please fill all the fields" });
    }
    try {
        const user = await buyer.findOne({ email, password });
        if (!user) {
            return res.status(401).json({ error: "Invalid Credentials or User not Registered" });
        }
        res.status(200).json({ message: "Login Successful", user: user });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error while logging in" });
    }
}
const viewProperties = async (req, res) => {
    try {
        const allProperties = await property.find();
        res.status(200).json({ message: "All Registered Properties", allProperties });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error while getting all properties" });
    }
}

const addToInterestedProperties = async (req, res) => {
    const { buyerId, propertyId } = req.body;
    if (!buyerId || !propertyId) {
        return res.status(400).json({ error: "Please fill all the fields" });
    }
    try {
        const updatedBuyer = await buyer.findByIdAndUpdate(buyerId, { $push: { interestedProperties: propertyId } }, { new: true });
        if (!updatedBuyer) {
            return res.status(404).json({ error: "Buyer not found" });
        }
        const updatedProperty = await property.findByIdAndUpdate(propertyId, { $push: { likes: buyerId } }, { new: true });
        if (!updatedProperty) {
            return res.status(404).json({ error: "Property not found" });
        }
        res.status(200).json({ message: "Property Added to Interested Properties Successfully" });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error while adding property to interested properties" });
    }
}

const viewBuyerProfile = async (req, res) => {
    const { buyerId } = req.body;
    if (!buyerId) {
        return res.status(400).json({ error: "Please fill all the fields" });
    }
    try {
        const buyerProfile = await buyer.findById(buyerId);
        if (!buyerProfile) {
            return res.status(404).json({ error: "Buyer not found" });
        }
        res.status(200).json({ message: "Buyer Profile", buyerProfile });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error while getting buyer profile" });
    }
}

const toggleLikeProperty = async (req, res) => {
    const { buyerId, propertyId } = req.body;
    if (!buyerId || !propertyId) {
        return res.status(400).json({ error: "Please fill all the fields" });
    }
    try {
        const updatedBuyer = await buyer.findByIdAndUpdate(buyerId, { $push: { likedProperties: propertyId } }, { new: true });
        if (!updatedBuyer) {
            return res.status(404).json({ error: "Buyer not found" });
        }
        res.status(200).json({ message: "Property Liked Successfully" });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error while liking property" });
    }
}

const getPropertyDetails = async (req, res) => {
    console.log(req.query);
    const { propertyId } = req.query;
    if (!propertyId) {
        return res.status(400).json({ error: "Please fill all the fields" });
    }
    try {
        const propertyDetails = await property.findById(propertyId);
        if (!propertyDetails) {
            return res.status(404).json({ error: "Property not found" });
        }
        
        const sellerDetails = await seller.findById(propertyDetails.soldBy);
        res.status(200).json({ message: "Property Details", propertyDetails, sellerDetails });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error while getting property details" });
    }
}

export { registerBuyer, loginBuyer, viewProperties,getPropertyDetails, addToInterestedProperties, viewBuyerProfile, toggleLikeProperty }