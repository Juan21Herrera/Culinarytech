import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const isLoggedIn = true;

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/70 backdrop-blur-sm text-black shadow-md z-50 transition duration-300 ease-in-out">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-black">
          CulinaryTech
        </Link>
        <div className="flex items-center space-x-4 hidden md:flex">
            <Link to="/fridge" className="hover:text-purple-400 transition">What's in your fridge?</Link>
            <Link to="/only-ingredients" className="hover:text-purple-400 transition">Ingredients</Link>
            <button className='bg-gray-800 hover:bg-gray-500 font-semibold py-2 px-4 rounded-lg transition duration-300'>
                <Link to="/login" className="text-white transition">Login </Link>
            </button>
            <button className='bg-gray-800 hover:bg-gray-500 font-semibold py-2 px-4 rounded-lg transition duration-300'>
                <Link to="/login" className="text-white transition">Sign up </Link>
            </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
