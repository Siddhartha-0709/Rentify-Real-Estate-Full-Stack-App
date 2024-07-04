/* eslint-disable no-unused-vars */
import { useState } from 'react';
import axios from 'axios';
import { Spinner } from "react-activity";
import "react-activity/dist/library.css";
import { useLocation } from 'react-router-dom';

const PropertyForm = () => {
    const location = useLocation();
    const userId = location.state.sellerId;
    const [showActivity, setShowActivity] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);

    const [formData, setFormData] = useState({
        propertyType: '',
        address: '',
        price: '',
        description: '',
        availability: '',
        landmark: '',
        sqftArea: '',
        latitude: '',
        longitude: '',
        pincode: '',
        userId: userId,
        image: null
    });


    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleRadioChange = (e) => {
        const { value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            propertyType: value,
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormData((prevData) => ({
            ...prevData,
            image: file,
        }));
        console.log(file);
    };

    const removeImage = (index) => {
        setSelectedImages([...selectedImages.slice(0, index), ...selectedImages.slice(index + 1)]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.table(formData);
        if (formData.address === '' || formData.price === '' || formData.description === '' || formData.landmark === '' || formData.sqftArea === '' || formData.pincode === '' || formData.propertyType === '' || formData.availability === '' || !formData.image || formData.latitude === '' || formData.longitude === '') {
            alert('Please fill all the fields');
            return;
        }
        try {
            setShowActivity(true);
            const nearbyLandmarks = formData.landmark.split(',');
            formData.nearbyLandmarks = nearbyLandmarks;
            formData.coordinates = {};
            formData.coordinates.longitude = formData.longitude;
            formData.coordinates.latitude = formData.latitude;
            delete formData.latitude;
            delete formData.longitude;
            console.table('Final Payload ', formData);
            // Send the POST request
            const response = await axios.post('https://rentify-real-estate-full-stack-app.onrender.com/api/v1/seller/add-property', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.status === 201) {
                alert('Property added successfully');
                setFormData({ propertyType: '', address: '', price: '', description: '', availability: '', landmark: '', sqftArea: '', coordinates: { latitude: '', longitude: '' }, pincode: '', userId: userId, image: null });
            } else {
                alert('Something went wrong');
            }
            setShowActivity(false);
        } catch (error) {
            alert('Something went wrong');
            console.log(error);
            setShowActivity(false);
        }
    };


    return (
        showActivity ? (<div className="flex items-center justify-center h-screen">
            <Spinner />
            <div className="mr-2 ml-5 ">Uploading, please wait </div>
        </div>) :
            (<main>
                <section className="bg-gray-950 text-gray-50 py-12 md:py-20">
                    <div className="container mx-auto px-4 md:px-6 grid gap-6 md:grid-cols-2 items-center">
                        <div className="space-y-4">
                            <h1 className="text-3xl md:text-4xl font-bold">Add a new property to Rentify</h1>
                            <p className="text-gray-400">List your property and reach a wide audience of potential tenants.</p>
                        </div>
                        <img
                            src="https://firebasestorage.googleapis.com/v0/b/shaajo-online-jewellery-a2f57.appspot.com/o/res%2FWhite%20Brown%20Classy%20Real%20Estate%20Facebook%20Post%20.png?alt=media&token=543c5d82-1f45-4b4d-b4da-5f49010dfa3c"
                            width="600"
                            height="400"
                            alt="Hero Image"
                            className="rounded-lg"
                            style={{ objectFit: 'cover' }}
                        />
                    </div>
                </section>
                <section className="py-12 md:py-20">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="rounded-lg border bg-card text-card-foreground shadow-sm max-w-2xl mx-auto" data-v0-t="card">
                            <div className="flex flex-col space-y-1.5 p-6">
                                <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">List a new property</h3>
                            </div>
                            <div className="p-6">
                                {/* <h1 className="text-3xl md:text-4xl font-bold">Id-{userId}</h1> */}
                                <form className="grid gap-6" onSubmit={handleSubmit}>
                                    <div>
                                        <label
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            htmlFor="property-type"
                                        >
                                            Property Type
                                        </label>
                                        <div
                                            role="radiogroup"
                                            aria-required="false"
                                            dir="ltr"
                                            className="grid grid-cols-3 gap-4"
                                            id="property-type"
                                            tabIndex="0"
                                            style={{ outline: 'none' }}
                                        >
                                            <label
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 border rounded-md p-4 flex flex-col items-center gap-2 cursor-pointer [&:has(:checked)]:bg-gray-400 dark:[&:has(:checked)]:bg-gray-300"
                                                htmlFor="apartment"
                                            >
                                                <input
                                                    aria-hidden="true"
                                                    tabIndex="-1"
                                                    type="radio"
                                                    value="apartment"
                                                    id="apartment"
                                                    name="propertyType"
                                                    checked={formData.propertyType === 'apartment'}
                                                    onChange={handleRadioChange}
                                                    style={{
                                                        transform: 'translateX(-100%)',
                                                        position: 'absolute',
                                                        pointerEvents: 'none',
                                                        opacity: 0,
                                                        margin: '0px',
                                                        width: '16px',
                                                        height: '16px',
                                                    }}
                                                />
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="w-8 h-8"
                                                >
                                                    <rect width="16" height="20" x="4" y="2" rx="2" ry="2"></rect>
                                                    <path d="M9 22v-4h6v4"></path>
                                                    <path d="M8 6h.01"></path>
                                                    <path d="M16 6h.01"></path>
                                                    <path d="M12 6h.01"></path>
                                                    <path d="M12 10h.01"></path>
                                                    <path d="M12 14h.01"></path>
                                                    <path d="M16 10h.01"></path>
                                                    <path d="M16 14h.01"></path>
                                                    <path d="M8 10h.01"></path>
                                                    <path d="M8 14h.01"></path>
                                                </svg>
                                                <span>Apartment</span>
                                            </label>
                                            <label
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 border rounded-md p-4 flex flex-col items-center gap-2 cursor-pointer [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-300"
                                                htmlFor="house"
                                            >
                                                <input
                                                    aria-hidden="true"
                                                    tabIndex="-1"
                                                    type="radio"
                                                    value="house"
                                                    id="house"
                                                    name="propertyType"
                                                    checked={formData.propertyType === 'house'}
                                                    onChange={handleRadioChange}
                                                    style={{
                                                        transform: 'translateX(-100%)',
                                                        position: 'absolute',
                                                        pointerEvents: 'none',
                                                        opacity: 0,
                                                        margin: '0px',
                                                        width: '16px',
                                                        height: '16px',
                                                    }}
                                                />
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="w-8 h-8"
                                                >
                                                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                                                </svg>
                                                <span>House</span>
                                            </label>
                                            <label
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 border rounded-md p-4 flex flex-col items-center gap-2 cursor-pointer [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-300"
                                                htmlFor="villa"
                                            >
                                                <input
                                                    aria-hidden="true"
                                                    tabIndex="-1"
                                                    type="radio"
                                                    value="villa"
                                                    id="villa"
                                                    name="propertyType"
                                                    checked={formData.propertyType === 'villa'}
                                                    onChange={handleRadioChange}
                                                    style={{
                                                        transform: 'translateX(-100%)',
                                                        position: 'absolute',
                                                        pointerEvents: 'none',
                                                        opacity: 0,
                                                        margin: '0px',
                                                        width: '16px',
                                                        height: '16px',
                                                    }}
                                                />
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="w-8 h-8"
                                                >
                                                    <rect width="16" height="20" x="4" y="2" rx="2" ry="2"></rect>
                                                    <path d="M9 22v-4h6v4"></path>
                                                    <path d="M8 6h.01"></path>
                                                    <path d="M16 6h.01"></path>
                                                    <path d="M12 6h.01"></path>
                                                    <path d="M12 10h.01"></path>
                                                    <path d="M12 14h.01"></path>
                                                    <path d="M16 10h.01"></path>
                                                    <path d="M16 14h.01"></path>
                                                    <path d="M8 10h.01"></path>
                                                    <path d="M8 14h.01"></path>
                                                </svg>
                                                <span>Villa</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div>
                                        <label
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            htmlFor="address"
                                        >
                                            Address
                                        </label>
                                        <input
                                            className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="text"
                                            id="address"
                                            placeholder="Enter the property address"
                                            value={formData.address}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <label
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            htmlFor="price"
                                        >
                                            Price
                                        </label>
                                        <input
                                            className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="text"
                                            id="price"
                                            placeholder="Enter the price in USD"
                                            value={formData.price}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <label
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            htmlFor="description"
                                        >
                                            Description
                                        </label>
                                        <textarea
                                            className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 h-32"
                                            id="description"
                                            placeholder="Enter the property description"
                                            value={formData.description}
                                            onChange={handleChange}
                                        ></textarea>
                                    </div>
                                    <div>
                                        <label
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            htmlFor="availability"
                                        >
                                            Availability
                                        </label>
                                        <div
                                            role="radiogroup"
                                            aria-required="false"
                                            dir="ltr"
                                            className="grid grid-cols-2 gap-4"
                                            id="availability"
                                            tabIndex="0"
                                            style={{ outline: 'none' }}
                                        >
                                            <label
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 border rounded-md p-4 flex flex-col items-center gap-2 cursor-pointer [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-300"
                                            >
                                                <input
                                                    aria-hidden="true"
                                                    tabIndex="-1"
                                                    type="radio"
                                                    value={true}
                                                    id="available"
                                                    name="availability"
                                                    checked={formData.availability}
                                                    onChange={() => setFormData({ ...formData, availability: true })}
                                                    style={{
                                                        transform: 'translateX(-100%)',
                                                        position: 'absolute',
                                                        pointerEvents: 'none',
                                                        opacity: 0,
                                                        margin: '0px',
                                                        width: '16px',
                                                        height: '16px',
                                                    }}
                                                />
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="w-8 h-8"
                                                >
                                                    <path d="M12 2L2 7l10 5 10-5-10-5zm0 7l-10 5 10 5 10-5-10-5zm0 7l-10 5 10 5 10-5-10-5z"></path>
                                                </svg>
                                                <span>Available</span>
                                            </label>
                                            <label
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 border rounded-md p-4 flex flex-col items-center gap-2 cursor-pointer [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-300"
                                            >
                                                <input
                                                    aria-hidden="true"
                                                    tabIndex="-1"
                                                    type="radio"
                                                    value={false}
                                                    id="sold"
                                                    name="availability"
                                                    checked={!formData.availability}
                                                    onChange={() => setFormData({ ...formData, availability: false })}
                                                    style={{
                                                        transform: 'translateX(-100%)',
                                                        position: 'absolute',
                                                        pointerEvents: 'none',
                                                        opacity: 0,
                                                        margin: '0px',
                                                        width: '16px',
                                                        height: '16px',
                                                    }}
                                                />
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="w-8 h-8"
                                                >
                                                    <path d="M19 10l-7 7-7-7"></path>
                                                </svg>
                                                <span>Sold</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div>
                                        <label
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            htmlFor="landmark"
                                        >
                                            Landmark
                                        </label>
                                        <input
                                            className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="text"
                                            id="landmark"
                                            placeholder="Enter nearby landmarks"
                                            value={formData.landmark}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <label
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            htmlFor="sqftArea"
                                        >
                                            Sqft Area
                                        </label>
                                        <input
                                            className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="text"
                                            id="sqftArea"
                                            placeholder="Enter the area in sqft"
                                            value={formData.sqftArea}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                htmlFor="latitude"
                                            >
                                                Latitude
                                            </label>
                                            <input
                                                className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                type="text"
                                                id="latitude"
                                                placeholder="Enter the latitude"
                                                value={formData.latitude}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div>
                                            <label
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                htmlFor="longitude"
                                            >
                                                Longitude
                                            </label>
                                            <input
                                                className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                type="text"
                                                id="longitude"
                                                placeholder="Enter the longitude"
                                                value={formData.longitude}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            htmlFor="pincode"
                                        >
                                            Pincode
                                        </label>
                                        <input
                                            className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="text"
                                            id="pincode"
                                            placeholder="Enter the pincode"
                                            value={formData.pincode}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            htmlFor="images"
                                        >
                                            Images
                                        </label>
                                        <input type="file" id="image" onChange={handleImageChange} />
                                        <div className="mt-2 flex flex-wrap gap-4">
                                            {selectedImages.map((image, index) => (
                                                <div key={index} className="relative w-32 h-32">
                                                    <img
                                                        src={URL.createObjectURL(image)}
                                                        alt={`Selected Image ${index + 1}`}
                                                        className="w-full h-full object-cover rounded-md"
                                                    />
                                                    <button
                                                        type="button"
                                                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                                                        onClick={() => removeImage(index)}
                                                    >
                                                        &times;
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <button
                                className="mt-4 inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                type="submit"
                                onClick={handleSubmit}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </section>
            </main >)
    );
};

export default PropertyForm;