import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        isSeller: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(formData.isSeller===true){
            console.log("seller");
            try{
                const response = await axios.post('http://localhost:3000/api/v1/login/seller-login',{
                    email: formData.email,
                    password: formData.password
                });
                console.log(response.data);
                const userId = response.data.user._id
                if(response.data){
                    navigate('/seller-listings',{ state: {userId } });
                }
            }
            catch(error){
                console.log(error);
            }
        }
        else{
            console.log("buyer");
            try{
                const response = await axios.post('http://localhost:3000/api/v1/buyer/login-buyer',{
                    email: formData.email,
                    password: formData.password
                });
                console.log(response.data);
                const userId = response.data.user._id;
                console.log(userId);
                if(response.data){
                    navigate('/home',{ state: {userId: userId } });
                }
            }
            catch(error){
                console.log(error);
            }
        }
    };

    return (
        <div className="w-full min-h-screen bg-gray-950 flex items-center justify-center">
            <div className="container max-w-6xl px-4 md:px-6 py-12 md:py-20 grid md:grid-cols-2 gap-8 md:gap-12">
                <div className="space-y-4 md:space-y-6">
                    <div className="space-y-2">
                        {/* <img
                            src="https://generated.vusercontent.net/placeholder.svg"
                            width="150"
                            height="50"
                            alt="Rentify"
                            className="w-auto h-8 md:h-10"
                            style={{ aspectRatio: '150 / 50', objectFit: 'cover' }} */}
                        {/* /> */}
                        <h1 className="text-3xl text-white md:text-4xl font-bold tracking-tight">Welcome to Rentify</h1>
                        <p className="text-gray-500 dark:text-gray-400 max-w-md">
                            Discover your perfect rental with our easy-to-use platform. Sign up today as a buyer or seller.
                        </p>
                    </div>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="space-y-2">
                            <label
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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
                                Login as a seller
                            </label>
                        </div>
                        <button
                            className="inline-flex bg-white items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
                            type="submit"
                        >
                            Login
                        </button>
                        <div className="flex items-center justify-between">
                            <a
                                className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                                href="#"
                            >
                                Forgot password?
                            </a>
                            <Link
                                className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                                to={'/get-started'}
                            >
                                New User? Sign up
                            </Link>
                        </div>
                    </form>
                </div>
                <div className="hidden md:block pt-20">
                    <img
                        src="https://firebasestorage.googleapis.com/v0/b/shaajo-online-jewellery-a2f57.appspot.com/o/res%2FReal%20Estate.png?alt=media&token=79a9c50f-bd48-49a2-90f0-4b14bf91c41a"
                        width="800"
                        height="400"
                        alt="Rentify Illustration"
                        className="w-full h-auto rounded-lg"
                        style={{ objectFit: '' }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Login;