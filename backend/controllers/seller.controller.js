import { seller } from "../models/seller.model.js";
import { property } from "../models/property.model.js";
import { uploadOnCloudinary } from "../middleware/cloudinary.js";
const registerNewSeller = async (req, res) => {
  const { firstName, lastName, email, password, phoneNumber, governmentId } =
    req.body;
  if (!firstName || !lastName || !email || !password || !phoneNumber) {
    return res.status(400).json({ error: "Please fill all the fields" });
  }
  try {
    const user = await seller.findOne({ email });
    if (user) {
      return res.status(409).json({ error: "User already exists" });
    }
    const newSeller = new seller({
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      governmentId,
    });
    await newSeller.save();
    res.status(201).json({ message: "New Seller Registered Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error while registering new seller" });
  }
};

const loginSeller = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Please fill all the fields" });
  }
  try {
    const user = await seller.findOne({ email, password });
    if (!user) {
      return res
        .status(401)
        .json({ error: "Invalid Credentials or User not Registered" });
    }
    res.status(200).json({ message: "Login Successful", user: user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error while logging in" });
  }
};

const getAllSellers = async (req, res) => {
  try {
    const allSellers = await seller.find();
    res.status(200).json({ message: "All Registered Sellers", allSellers });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error while getting all sellers" });
  }
};

const addProperty = async (req, res) => {
  const { propertyType, address, price, description, image, availability, userId, coordinates, sqftArea, pincode, nearbyLandmarks  } = req.body;
  console.table(req.body);
//   if (!propertyType ||!address ||!price ||!description ||!nearbyLandmarks ||!sqftArea ||!pincode == "") {
//     console.log(`Something is missing. Property Type: ${propertyType}, Address: ${address}, Price: ${price}, Description: ${description}, Is Available: ${isAvailable}, Coordinates: ${coordinates}, Nearby Landmarks: ${nearbyLandmarks}, Sqft Area: ${sqftArea}, Pin Code: ${pincode}`);
//     return res.status(400).json({
//       error: "Please fill all the fields",
//       message: "Something is missing",
//     });
//   }
  if (!req.file) {
    console.log("Please upload an image");
    return res.status(400).json({ error: "Please upload an image" });
  }
  const imagePath = req.file.path;
  const imageUrlCloudinary = await uploadOnCloudinary(imagePath);
  //   console.log("Image Url Cloudinary-->", imageUrlCloudinary);

  try {
    const newProperty = new property({
      propertyType,
      address,
      price,
      description,
      imageUrl: imageUrlCloudinary.url,
      isAvailable: availability,
      soldBy: userId,
      coordinates,
      nearbyLandmarks,
      sqftArea,
      pinCode:pincode,
    });

    console.log("New Property");
    console.table(newProperty);
    await newProperty.save();
    await seller.findByIdAndUpdate(
      { _id: userId },
      { $push: { postedProperties: newProperty._id } }
    );
    res.status(201).json({ message: "New Property Added Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error while adding property" });
  }
};

const deleteProperty = async (req, res) => {
  const { propertyId } = req.body;
  if (!propertyId) {
    return res.status(400).json({ error: "Please fill all the fields" });
  }
  try {
    const deletedProperty = await property.findByIdAndDelete(propertyId);
    if (!deletedProperty) {
      return res.status(404).json({ error: "Property not found" });
    }
    res.status(200).json({ message: "Property Deleted Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error while deleting property" });
  }
};
const modifyAvailability = async (req, res) => {
  const { propertyId, isAvailable } = req.body;
  if (!propertyId || !isAvailable) {
    return res.status(400).json({ error: "Please fill all the fields" });
  }
  try {
    
    const updatedProperty = await property.findByIdAndUpdate(
      propertyId,
      { isAvailable },
      { new: true }
    );
    console.table(updatedProperty);
    updatedProperty.save();
    if (!updatedProperty) {
      return res.status(404).json({ error: "Property not found" });
    }
    res
      .status(200)
      .json({ message: "Property Availability Updated Successfully" });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: "Error while updating property availability" });
  }
};
const sellerPostedProperty = async (req, res) => {
  const { sellerId } = req.body;
  if (!sellerId) {
    return res.status(400).json({ error: "Please fill all the fields" });
  }
  try {
    const sellerDetails = await seller.findById(sellerId);
    const postedProperties = await property.find({ soldBy: sellerId });
    res
      .status(200)
      .json({ message: "Posted Properties", postedProperties, sellerDetails });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error while getting posted properties" });
  }
};

export {
  registerNewSeller,
  loginSeller,
  addProperty,
  getAllSellers,
  deleteProperty,
  modifyAvailability,
  sellerPostedProperty,
};
