import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './Screens/Home';
import PropertyForm from './Screens/AddProperty';
import GetStarted from './Screens/GetStarted';
import Login from './Screens/Login';
import PropertyDetails from './Screens/PropertyDetails';
import SellerListing from './Screens/SellerListing';
import BuyerViewProfile from './Screens/BuyerViewProfile';
import Contact from './Screens/Contact';
import About from './Screens/About';
import FAQs from './Screens/FAQs';

function App() {
  return (
    <Router>
      <header className="bg-gray-950 text-gray-50 py-4 px-4 md:px-6">
        <div className="container mx-auto flex items-center justify-between">
          <Link className="flex items-center gap-2" to="/">
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
              className="w-6 h-6"
            >
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            <span className="text-xl font-bold">Rentify</span>
          </Link>
        <nav className="flex items-center gap-4">
            <Link className="text-sm hover:underline" to={"/about"}>
              About Us
            </Link>
            <Link className="text-sm hover:underline" to={"/contact"}>
              Contact Us
            </Link>
            <Link className="text-sm hover:underline" to={"/faqs"}>
              FAQs
            </Link>
          </nav>
        </div>
      </header>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<GetStarted />} />
        <Route path="/profile" element={<BuyerViewProfile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add-property" element={<PropertyForm/>} />
        <Route path="/property-details" element={<PropertyDetails/>} />
        <Route path="/seller-listings" element={<SellerListing/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/faqs" element={<FAQs/>} />
      </Routes>
      <footer className="bg-gray-950 text-gray-50 py-6 px-4 md:px-6">
        <div className="container mx-auto flex items-center justify-between">
          <Link className="flex items-center gap-2" to={"/"}>
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
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            <span className="text-sm">Rentify</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link className="text-sm hover:underline" to={"/about"}>
              About Us
            </Link>
            <Link className="text-sm hover:underline" to={"/contact"}>
              Contact Us
            </Link>
            <Link className="text-sm hover:underline" to={"/faqs"}>
              FAQs
            </Link>
          </nav>
        </div>
      </footer>
    </Router>

  );
}

export default App;