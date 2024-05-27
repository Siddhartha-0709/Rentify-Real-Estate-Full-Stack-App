import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const GetStarted = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        isSeller: false,
        phoneNumber: '',
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        // http://localhost:3000/api/v1/register/seller-register
        // http://localhost:3000/api/v1/buyer/register-buyer
        e.preventDefault();
        // console.log(formData);
        if(formData.isSeller===true){
            console.log("seller");
            try{
                const response = await axios.post('http://localhost:3000/api/v1/register/seller-register',{
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    password: formData.password,
                    phoneNumber: formData.phoneNumber
                });
                console.log(response.data);
                if(response.data){
                    window.location.href = '/login';
                }
            }
            catch(error){
                console.log(error);
            }
        }
        else{
            console.log("buyer");
            try{
                const response = await axios.post('http://localhost:3000/api/v1/buyer/register-buyer',{
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    password: formData.password,
                    phoneNumber: formData.phoneNumber
                });
                console.log(response.data);
                if(response.data){
                    window.location.href = '/login';
                }
            }
            catch(error){
                console.log(error);
            }
        }
    };

    return (
        <div className="w-full min-h-screen bg-gray-100 dark:bg-gray-950 flex items-center justify-center">
            <div className="container max-w-6xl px-4 md:px-6 py-12 md:py-20 grid md:grid-cols-2 gap-8 md:gap-12">
                <div className="space-y-4 md:space-y-6">
                    <div className="space-y-2">
                        {/* <img
                            src="https://generated.vusercontent.net/placeholder.svg"
                            width="150"
                            height="50"
                            alt="Rentify"
                            className="w-auto h-8 md:h-10"
                            style={{ aspectRatio: '150 / 50', objectFit: 'cover' }}
                        /> */}
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">Welcome to Rentify</h1>
                        <p className="text-gray-500 dark:text-gray-400 max-w-md">
                            Discover your perfect rental with our easy-to-use platform. Sign up today as a buyer or seller.
                        </p>
                    </div>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label
                                    className="text-sm text-white font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    htmlFor="firstName"
                                >
                                    First Name
                                </label>
                                <input
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    id="firstName"
                                    name="firstName"
                                    placeholder="Enter your first name"
                                    required
                                    value={formData.firstName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <label
                                    className="text-sm text-white font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    htmlFor="lastName"
                                >
                                    Last Name
                                </label>
                                <input
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    id="lastName"
                                    name="lastName"
                                    placeholder="Enter your last name"
                                    required
                                    value={formData.lastName}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label
                                className="text-sm text-white font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                htmlFor="email"
                            >
                                Email
                            </label>
                            <input
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                id="email"
                                name="email"
                                placeholder="Enter your email"
                                required
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="space-y-2">
                            <label
                                className="text-sm text-white font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                htmlFor="phoneNumber"
                            >
                                Phone Number
                            </label>
                            <input
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                id="phoneNumber"
                                name="phoneNumber"
                                placeholder="Enter your phone number"
                                required
                                type="number"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="space-y-2" src="/placeholder.svg"
                        >
                            <label
                                className="text-sm text-white font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                htmlFor="password"
                            >
                                Password
                            </label>
                            <input
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                id="password"
                                name="password"
                                placeholder="Enter your password"
                                required
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="isSeller"
                                name="isSeller"
                                checked={formData.isSeller}
                                onChange={handleChange}
                                className="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                            />
                            <label
                                className="text-sm text-white font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                htmlFor="isSeller"
                            >
                                Sign up as a seller
                            </label>
                        </div>
                        <button
                            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
                            type="submit"
                        >
                            Sign Up
                        </button>
                    </form>
                    <br />
                    <Link to="/login">
                        <span className="text-sm text-white font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mt-3">Already have an account? Login</span>
                    </Link>
                </div>
                <div className="hidden md:block p-5">
                    <img
                        src="https://firebasestorage.googleapis.com/v0/b/shaajo-online-jewellery-a2f57.appspot.com/o/res%2FReal%20Estate%20(Facebook%20Post).png?alt=media&token=dcb7530c-007c-4bb3-9cfe-39a78cb9d313"
                        width="500"
                        height="500"
                        alt="Rentify Illustration"
                        className="w-full h-auto rounded-lg"
                        style={{ aspectRatio: '500 / 500', objectFit: 'cover' }}
                    />
                </div>
            </div>
        </div>
    );
};

export default GetStarted;