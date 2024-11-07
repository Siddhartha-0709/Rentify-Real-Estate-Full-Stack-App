
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function SellerListing() {
    const location = useLocation();
    const userId = location.state.userId;
    const [sellerData, setSellerData] = useState({});
    const [postedProperties, setPostedProperties] = useState([]);
    const fetchSellerDetails = async () => {
        try {
            const response = await axios.post('http://localhost:3000/api/v1/seller/seller-posted-property', { sellerId: userId });
            const data = response.data; // Directly access the data from the response
            setSellerData(data.sellerDetails);
            setPostedProperties(data.postedProperties);
            console.log(data);
        } catch (error) {
            console.error('Error fetching seller details:', error);
        }
    };
    const navigate = useNavigate();
    const navigateToAddProperty = () => {
        navigate('/add-property', { state: { sellerId: userId } });
    }
    const handleDeleteProperty = async (propertyId) => {
        try {
            const response = await axios.post('http://localhost:3000/api/v1/seller/delete-property', { propertyId: propertyId });
            if (response.status === 200) {
                alert("Property Deleted Successfully");
                fetchSellerDetails();
            }
        }
        catch (error) {
            console.error('Error deleting property:', error);
        }
    }
    const handleModifyAvailability = async (propertyId, isAvailable) => {
        try {
            const response = await axios.post('http://localhost:3000/api/v1/seller/modity-availability', { propertyId: propertyId, isAvailable: isAvailable });
            if (response.status === 200) {
                alert("Availability Modified Successfully");
                fetchSellerDetails();
            }
            else {
                alert("Something went wrong");
            }
        }
        catch (error) {
            console.error('Error modifying availability:', error);
        }
    }
    useEffect(() => {
        fetchSellerDetails();
    }, []);
    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex flex-1">
                {/* <nav className="bg-gray-800 text-gray-400 p-6 space-y-4">
                    <a className="flex items-center gap-2 hover:text-white transition-colors" href="#">
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
                            className="w-5 h-5"
                        >
                            <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                            <path d="M3 9h18"></path>
                            <path d="M3 15h18"></path>
                            <path d="M9 3v18"></path>
                            <path d="M15 3v18"></path>
                        </svg>
                        View all listings
                    </a>
                    <a className="flex items-center gap-2 hover:text-white transition-colors" href="#">
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
                            className="w-5 h-5"
                        >
                            <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path>
                            <path d="M21 3v5h-5"></path>
                            <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path>
                            <path d="M8 16H3v5"></path>
                        </svg>
                        Change availability
                    </a>
                    <a className="flex items-center gap-2 hover:text-white transition-colors" href="#">
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
                            className="w-5h-5"
                        >
                            <path d="M3 6h18"></path>
                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                        </svg>
                        Delete a listing
                    </a>
                </nav> */}
                <div className="flex-1 p-8">
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-2xl font-bold">Hi, {sellerData.firstName} {sellerData.lastName} </h1>
                        <span className="ml-4 font-semibold"></span>
                        <button className="bg-black text-white inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-3"
                            onClick={navigateToAddProperty}
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
                                className="w-4 h-4 mr-2"
                            >
                                <path d="M5 12h14"></path>
                                <path d="M12 5v14"></path>
                            </svg>
                            Add new listing
                        </button>
                    </div>
                    <h1 className="text-xl font-bold mb-4">Your Listings</h1>

                    <div className="border rounded-lg overflow-hidden">
                        <div className="relative w-full overflow-auto">
                            <table className="w-full caption-bottom text-sm">
                                <thead className="[&_tr]:border-b">
                                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                                            Date Added
                                        </th>
                                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                                            Type
                                        </th>
                                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                                            Address
                                        </th>
                                        <th className="h-12 px-4 text-center align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                                            PIN Code
                                        </th>
                                        <th className="h-12 px-4 text-center align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                                            Area
                                        </th>
                                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                                            Price
                                        </th>
                                        <th className="h-12 px-1 text-center align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                                            Status
                                        </th>
                                        <th className="h-12 px-1 text-center align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                                            Likes
                                        </th>
                                        <th className="p-4 h-12 px-1 text-center align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="[&_tr:last-child]:border-0">
                                    {postedProperties.map ? (postedProperties.map((property) => (
                                        <>
                                            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                                <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                                                    {new Date(property.createdAt).toISOString().split('T')[0]}
                                                </td>                                                
                                                <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">{property.propertyType.toUpperCase()}</td>
                                                <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">{property.address}</td>
                                                <td className="p-4 text-center align-middle [&:has([role=checkbox])]:pr-0">{property.pinCode}</td>
                                                <td className="p-4 text-center align-middle [&:has([role=checkbox])]:pr-0">{property.sqftArea} sqft</td>
                                                <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">INR {property.price}</td>
                                                <td className="justify-center items-center p-2 align-middle [&:has([role=checkbox])]:pr-0">
                                                    <center>
                                                        <div className=" inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                                                            {(property.isAvailable === 'true') ? "Available" : "Not Available"}
                                                        </div>
                                                    </center>
                                                </td>
                                                <td className="text-center p-2 align-middle [&:has([role=checkbox])]:pr-0">{property.likes.length}</td>
                                                <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                                                    <div className="flex items-center gap-2 justify-center">
                                                        <button
                                                            className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3"
                                                            color="red"
                                                            onClick={() => { handleDeleteProperty(property._id) }}
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-2"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" x2="10" y1="11" y2="17" /><line x1="14" x2="14" y1="11" y2="17" /></svg>
                                                        </button>
                                                        {(property.isAvailable === 'true') ? (
                                                            <button
                                                                className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3"
                                                                color="red"
                                                                onClick={() => { handleModifyAvailability(property._id, 'false') }}
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-x"><circle cx="12" cy="12" r="10" /><path d="m15 9-6 6" /><path d="m9 9 6 6" /></svg>
                                                            </button>
                                                        ) : (<button
                                                            className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3"
                                                            color="red"
                                                            onClick={() => { handleModifyAvailability(property._id, 'true') }}
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-check"><circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" /></svg>
                                                        </button>)}


                                                    </div>
                                                </td>
                                            </tr>
                                        </>
                                    ))) : null}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SellerListing
