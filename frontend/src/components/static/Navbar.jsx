import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/"); // O a donde quieras redirigir
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/70 backdrop-blur-sm text-black shadow-md z-50 transition duration-300 ease-in-out">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-black">
          CulinaryTech
        </Link>

        <div className="flex items-center space-x-4 hidden md:flex">
          <Link to="/fridge" className="hover:text-gray-500 transition">What's in your fridge?</Link>
          <Link to="/only-ingredients" className="hover:text-gray-500 transition">Ingredients</Link>
          <Link to="/recipes" className="hover:text-gray-500 transition">Recipes</Link>  

          {user ? (
            <div className="relative">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-2 focus:outline-none"
              >               
                <span className="font-semibold cursor-pointer">{user.name}</span>
                <FaUserCircle className="text-2xl cursor-pointer" />
              </button>

              {isOpen && (
                <div 
                className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 cursor-pointer text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsOpen(false)}
                  >
                    Perfil
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  >
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <button 
              onClick={() => navigate('/login')}
              className='bg-gray-800 hover:bg-gray-500 font-semibold py-2 px-4 rounded-lg cursor-pointer transition duration-300'>
                <Link to="/login" className="text-white transition">Login</Link>
              </button>
              <button 
              onClick={() => navigate('/register')}
              className='bg-gray-800 hover:bg-gray-500 font-semibold py-2 px-4 rounded-lg cursor-pointer transition duration-300'>
                <Link to="/register" className="text-white transition">Sign up</Link>
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
