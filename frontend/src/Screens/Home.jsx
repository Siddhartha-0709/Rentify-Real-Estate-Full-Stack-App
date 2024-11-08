import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";
function Home() {
    const [properties, setProperties] = useState([]);
    const location = useLocation();
    const userId = location.state?.userId;
    console.log('userId:', userId);
    const getProperties = async () => {
        try {
            const response = await axios.get('https://rentify-real-estate-full-stack-app.onrender.com/api/v1/buyer/view-properties');
            const data = response.data; // Directly access the data from the response
            console.log(data);
            setProperties(data.allProperties);
        } catch (error) {
            console.error('Error fetching properties:', error);
        }
    }
    const navigate = useNavigate();
    const navigateToPropertyDetails = (propertyId) => {
        navigate(`/property-details`, { state: { propertyId: propertyId, userId: userId } });
    };

    useEffect(() => {
        getProperties();
    }, []);
    return (
        <>
            <main>
                <div className="bg-gray-950 flex justify-end pr-6" style={{zIndex: 11}} >
                    <button className="flex items-center text-sm text-white font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3"
                        onClick={() => navigate('/profile', { state: { userId: userId } })}
                    >    
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-user-round mr-2">
                            <path d="M18 20a6 6 0 0 0-12 0" />
                            <circle cx="12" cy="10" r="4" />
                            <circle cx="12" cy="12" r="10" />
                        </svg>
                        View Profile
                    </button>
                </div>
                <section className="bg-gray-950 text-gray-50 py-12 md:py-20">

                    <div className="container mx-auto px-4 md:px-6 grid gap-6 md:grid-cols-2 items-center">

                        <div className="space-y-4">
                            <h1 className="text-3xl md:text-4xl font-bold">Find your dream property with Rentify</h1>
                            <p className="text-gray-400">Discover range of properties for rent or sale, tailored to your needs.Discover a wide range of properties for rent or sale, tailored to your needs. Whether you are seeking a cozy apartment in the heart of the city, a spacious family home in a tranquil neighborhood, or a luxurious villa with stunning views, we have the perfect property for you. Our extensive listings feature a variety of options, including modern apartments, charming houses, and exclusive penthouses, all equipped with the amenities you desire.</p>
                        </div>
                        <img
                            src="https://firebasestorage.googleapis.com/v0/b/shaajo-online-jewellery-a2f57.appspot.com/o/res%2FWhite%20Brown%20Classy%20Real%20Estate%20Facebook%20Post%20.png?alt=media&token=543c5d82-1f45-4b4d-b4da-5f49010dfa3c" width="600"
                            height="400"
                            alt="Hero Image"
                            className="rounded-lg"
                            style={{ objectFit: 'cover' }}
                        />
                    </div>
                </section>

                <section className="py-12 md:py-20">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {properties.map((property, index) => (
                                <div key={index} className="rounded-lg border bg-card text-card-foreground shadow-sm group" data-v0-t="card">
                                    
                                    <img
                                        src={property.imageUrl}
                                        width="400"
                                        height="300"
                                        alt="Property Image"
                                        className="rounded-t-lg object-cover w-full aspect-[4/3] group-hover:opacity-80 transition-opacity"
                                    />

                                    <div className="p-4 space-y-2">
                                        <span className="text-sm text-gray-500">Availability: {(property.isAvailable === 'true') ? 'Available' : 'Not Available'}</span>

                                        <div className="flex items-center justify-between">
                                            <span className="text-lg font-bold font-medium">{property.propertyType.toUpperCase()}</span>
                                            <div className="flex items-center gap-1">
                                            </div>
                                        </div>
                                        <span className="text-sm text-gray-500">{property.description.substr(0, 143)}{property.description.length > 100 ? '...' : ''}</span>
                                        <div className="flex items-center justify-between">
                                            <span className="text-lg font-bold">INR {property.price}</span>
                                            <span className="text-sm text-gray-500">{property.sqftArea} sqft</span>
                                        </div>
                                        <button
                                            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-10 px-4 py-2 w-full"
                                            onClick={() => navigateToPropertyDetails(property._id)}
                                        >
                                            View Listing
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* <section className="py-12 md:py-20">
                    <div className="container mx-auto px-4 md:px-6 flex justify-center">
                        <nav aria-label="pagination" className="mx-auto flex w-full justify-center" role="navigation">
                            <ul className="flex flex-row items-center gap-1">
                                <li>
                                    <a
                                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 gap-1 pl-2.5"
                                        aria-label="Go to previous page"
                                        href="#"
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
                                            className="lucide lucide-chevron-left h-4 w-4"
                                        >
                                            <path d="m15 18-6-6 6-6"></path>
                                        </svg>
                                        <span>Previous</span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10"
                                        href="#"
                                    >
                                        1
                                    </a>
                                </li>
                                <li>
                                    <a
                                        aria-current="page"
                                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10"
                                        href="#"
                                    >
                                        2
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10"
                                        href="#"
                                    >
                                        3
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 gap-1 pr-2.5"
                                        aria-label="Go to next page"
                                        href="#"
                                    >
                                        <span>Next</span>
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
                                            className="lucide lucide-chevron-right h-4 w-4"
                                        >
                                            <path d="m9 18 6-6-6-6"></path>
                                        </svg>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </section> */}
            </main>
        </>
    )
}

export default Home
