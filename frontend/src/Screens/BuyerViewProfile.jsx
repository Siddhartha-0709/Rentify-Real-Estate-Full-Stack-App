/* eslint-disable no-unused-vars */
import React from 'react'
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
function BuyerViewProfile() {
    const location = useLocation();
    const navigate = useNavigate();
    const userId = location.state.userId;

    const [userDetails, setUserDetails] = useState({});
    const [interestedProperties, setInterestedProperties] = useState([]);

    const getUserDetails = async () => {
        try {
            const response = await axios.post('https://rentify-real-estate-full-stack-app.onrender.com/api/v1/buyer/view-profile', { buyerId: userId });
            const data = response.data;
            setUserDetails(data.buyerProfile);
            console.log(data.buyerProfile);
            for (let i = 0; i < data.buyerProfile.interestedProperties.length; i++) {
                await getInterestedProperties(data.buyerProfile.interestedProperties[i]);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const getInterestedProperties = async (propertyId) => {
        try {
            const response = await axios.get(`https://rentify-real-estate-full-stack-app.onrender.com/api/v1/buyer/get-property-details?propertyId=${propertyId}`);
            setInterestedProperties(prevState => [...prevState, response.data.propertyDetails]);
        } catch (error) {
            console.error('Error fetching property details:', error);
        }
    };

    const navigateToPropertyDetails = (propertyId) => {
        navigate(`/property-details`, { state: { propertyId: propertyId, userId: userId } });
    };
    useEffect(() => {
        getUserDetails();
    }, []);

    useEffect(() => {
        console.log('interestedProperties:', interestedProperties);
        console.log('Length of interested properties:', interestedProperties.length);
    }, [interestedProperties]);
    return (
        <>
            <div className="flex flex-col min-h-screen">
                <div className="flex flex-1">
                    <div className="flex-1 p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <h1 className="text-2xl font-bold">Your Profile</h1>
                                </div>
                                <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
                                    <div className="p-6 space-y-4">
                                        <div className="flex items-center gap-4">
                                            <span className="relative flex shrink-0 overflow-hidden">
                                                {/* <img className="aspect-square h-full w-full" alt="John Doe" src="/placeholder-user.jpg" /> */}
                                                <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-user-round"><path d="M18 20a6 6 0 0 0-12 0" /><circle cx="12" cy="10" r="4" /><circle cx="12" cy="12" r="10" /></svg>
                                            </span>
                                            <div>
                                                <h2 className="text-xl font-bold">{userDetails.firstName} {userDetails.lastName}</h2>
                                                <p className="text-gray-500">{userDetails.email}</p>
                                            </div>
                                        </div>
                                        <div data-orientation="horizontal" role="none" className="shrink-0 bg-gray-100 h-[1px] w-full"></div>
                                        {/* <div>
                                            <h3 className="text-lg font-bold mb-2">About</h3>
                                            <p>
                                                John Doe is a real estate enthusiast who is interested in finding the perfect home for his family.
                                                He has been actively searching for properties in the local area and has a keen eye for detail.
                                            </p>
                                        </div> */}
                                        <div data-orientation="horizontal" role="none" className="shrink-0 bg-gray-100 h-[1px] w-full"></div>
                                        <div>
                                            <h3 className="text-lg font-bold mb-2">Contact</h3>
                                            <p>
                                                <span className="font-bold">Phone:</span> {userDetails.phoneNumber}
                                            </p>
                                            <p>
                                                {/* <span className="font-bold">Address:</span> 123 Main St, Anytown USA */}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <h1 className="text-2xl font-bold">Interested Properties</h1>
                                </div>

                                {interestedProperties.length === 0 ? (
                                    <p>No properties found</p>
                                ) : (
                                    <div className="overflow-x-auto">
                                        <table className="w-full caption-bottom text-sm">
                                            <thead>
                                                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                                                        Address
                                                    </th>
                                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                                                        Status
                                                    </th>
                                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                                                        Actions
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {interestedProperties.map((property, index) => (
                                                    <tr key={index} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                                        <td className="p-4 align-middle">
                                                            {property.address.substr(0, 50)}
                                                        </td>
                                                        <td className="p-4 align-middle">
                                                            <div className="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                                                                {property.isAvailable === 'true' ? 'Available' : 'Unavailable'}
                                                            </div>
                                                        </td>
                                                        <td className="p-4 align-middle"><button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3"
                                                                onClick={()=>{navigateToPropertyDetails(property._id)}}
                                                        >
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
                                                                className="w-4 h-4"
                                                            >
                                                                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                                                                <circle cx="12" cy="12" r="3"></circle>
                                                            </svg>
                                                        </button></td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}



                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BuyerViewProfile
