import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function PropertyDetails() {
    const location = useLocation();
    const propertyId = location.state?.propertyId; // Use optional chaining to avoid errors if state is undefined
    console.log('propertyId:', propertyId); // Log propertyId for debugging
    const userId = location.state?.userId;
    console.log('userId:', userId);
    const [details, setDetails] = useState({});
    const [seller, setSeller] = useState({});
    const [showAlert, setShowAlert] = useState(false);
    const [alertText, setAlertText] = useState('');
    const getPropertyDetails = async (propertyId) => {
        console.log('Fetching Data');
        try {
            const response = await axios.get(`http://localhost:3000/api/v1/buyer/get-property-details?propertyId=${propertyId}`);
            const data = response.data; // Directly access the data from the response
            console.log(data);
            setDetails(data.propertyDetails || {});
            setSeller(data.sellerDetails || {});
        } catch (error) {
            console.error('Error fetching property details:', error);
        }
    }
    const addToInterstedList = async () => {
        try {
            setShowAlert(true);
            const response = await axios.post('http://localhost:3000/api/v1/buyer/add-to-interest', { propertyId: details._id, buyerId: userId });
            console.log(response.data);
            setTimeout(() => {
                setAlertText('Added to interested list successfully');
                setShowAlert(false);
            }, 5000);
        } catch (error) {
            console.error('Error adding to interested list:', error);
        }
    }

    useEffect(() => {
        if (propertyId) {
            console.log('Calling getPropertyDetails'); // Check if propertyId is defined
            getPropertyDetails(propertyId);
        }
    }, [propertyId]);

    return (
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12 lg:py-16">
            {showAlert?(<div className="flex items-center p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
                <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <span className="sr-only">Info</span>
                <div>
                    <span className="font-medium text-white">{alertText}</span> 
                </div>
            </div>):null}
            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                <div className="space-y-6">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold">Property Details</h1>
                        <p className="text-gray-500 text-xl font-medium dark:text-gray-400 mt-2">
                            {details.propertyType?.toUpperCase() || 'N/A'}
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <div className="text-gray-500 dark:text-gray-400 text-sm font-medium">Price</div>
                            <div className="text-2xl font-bold">INR {details.price || 'N/A'}</div>
                            <div className="text-gray-500 dark:text-gray-400 text-sm font-medium mt-3">Sqft. Area</div>
                            <div className="text-2xl font-bold">{details.sqftArea || 'N/A'}<span className='text-sm'> sqft.</span></div>
                        </div>
                        <div>
                            <div className="text-gray-500 dark:text-gray-400 text-sm font-medium">Address</div>
                            <div>{details.address || 'N/A'}</div>
                            <div className="text-gray-500 dark:text-gray-400 text-sm font-medium mt-3">PIN</div>
                            <div>{details.pinCode || 'N/A'}</div>
                        </div>
                        <div>

                            <div className="text-gray-500 dark:text-gray-800 text-sm font-bold mt-5">Availability: {(details.isAvailable==='true' )? 'Available' : 'Not Available'}</div>
                            <div className="text-gray-500 dark:text-gray-400 text-sm font-medium mt-5">Coordinates</div>
                            <div>Latitude: {details.coordinates?.latitude || 'N/A'}</div>
                            <div>Longitude: {details.coordinates?.longitude || 'N/A'}</div>
                            <div>
                                <div className="text-gray-500 dark:text-gray-400 text-sm font-medium mt-3">Nearby Landmarks</div>
                                <ul className="list-disc list-inside">
                                    {details.nearbyLandmarks?.map((landmark, index) => (
                                        <li key={index}>{landmark}</li>
                                    )) || <li>N/A</li>}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="text-gray-500 dark:text-gray-400 text-sm font-medium">Description</div>
                        <div className="text-sm leading-relaxed">
                            {details.description || 'N/A'}
                        </div>
                    </div>
                    <button
                        className="inline-flex bg-black text-white items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
                        onClick={addToInterstedList}
                    >
                        Interested
                    </button>
                </div>
                <div className="space-y-6">
                    <div>
                        <div className="text-gray-500 dark:text-gray-400 text-sm font-medium">Seller Information</div>
                        <div className="space-y-2">
                            <div>
                                <div className="font-medium">{seller.firstName} {seller.lastName}</div>
                                {/* <div className="text-gray-500 dark:text-gray-400 text-sm">Rentify Real Estate</div> */}
                            </div>
                            <div className="space-y-1">
                                <div>
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
                                        className="w-4 h-4 inline-block mr-1"
                                    >
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                    </svg>
                                    <span>{seller.phoneNumber || 'N/A'}</span>
                                </div>
                                <div>
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
                                        className="w-4 h-4 inline-block mr-1"
                                    >
                                        <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                                    </svg>
                                    <span>{seller.email || 'N/A'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="text-gray-500 dark:text-gray-400 text-sm font-medium">Property Image</div>
                        <img
                            src={details.imageUrl}
                            alt="Property Image"
                            width="800"
                            height="600"
                            className="w-full rounded-lg object-cover"
                            style={{ aspectRatio: '800 / 600', objectFit: 'cover' }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PropertyDetails;
