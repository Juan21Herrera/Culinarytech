import { useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function LoginForm() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8000/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });

            if (!response.ok) {
                const errorData = await response.json();
                alert(`Error: ${errorData.detail}`);
                return;
            }

            const data = await response.json();
            console.log('Login exitoso. Datos:', data);

            // Guarda el token
            localStorage.setItem('token', data.access_token);

            // Guarda el usuario en el contexto
            const userData = {
                name: data.name,    // El backend debe devolverlo
                email: data.email   // El backend debe devolverlo
            };
            login(userData);

            // Redirige
            alert('Login exitoso!');
            navigate("/");

        } catch (error) {
            console.error('Error en login:', error);
            alert('Hubo un problema al intentar iniciar sesión.');
        }
    };

    return (
        <div className="w-full">
            <h2 className="text-2xl text-[#2D1B0E] font-semibold mb-4 text-center">Login</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="LoginEmail" className="block text-sm text-gray-700 p-2">Email</label>
                    <input
                        id="LoginEmail"
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="border rounded p border-gray-300 w-full p-2 bg-white/50 focus:ring-2 focus:ring-[#C19A6B] outline-none"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="LoginPass" className="block text-sm text-gray-700 p-2">Password</label>
                    <input
                        id="LoginPass"
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        className="border rounded border-gray-300 w-full p-2 bg-white/50 focus:ring-2 focus:ring-[#C19A6B] outline-none"
                        required
                    />
                </div>  

                <div className='mb-4 flex items-center'>
                    <input
                        id="LoginRemember"
                        type="checkbox"
                        name="remember"
                        className="mr-2 bg-[#C19A6B]"
                    />
                    <label htmlFor="LoginRemember" className="text-sm text-gray-700">Remember Me</label>
                </div>

                <button
                    type="submit"
                    className="w-full cursor-pointer bg-[#D4A373] hover:bg-[#C19A6B] text-[#2D1B0E] font-semibold py-2 px-4 rounded-lg rounded transition duration-300 ">
                    Sign In
                </button>
            </form>

            <aside className="mt-4 text-sm text-gray-600">
                <p className="flex justify-between mb-2">
                    <a href="/forgot" className="text-[#2D1B0E] cursor-pointer hover:text-[#C19A6B] font-semibold ml-1">Forgot Password?</a>
                    <p>Don't have an account?
                    <a href="/Register" className="text-[#2D1B0E] cursor-pointer hover:text-[#C19A6B] font-semibold ml-1"> Register</a>
                    </p>
                </p>

                <div className="flex items-center my-6">
                    <div className="flex-grow border-t border-black/30"></div>
                    <span className="mx-4 text-gray-500">OR</span>
                    <div className="flex-grow border-t border-black/30"></div>
                </div>

                <button className="flex cursor-pointer items-center bg-white justify-center w-full border border-gray-300 p-2 rounded-lg shadow-sm hover:bg-gray-100 transition">
                    <FcGoogle size={24} className="mr-2" />
                    Sign up with Google
                </button>
                <p className='text-center text-gray-500 pt-4'>
                    By signing in, you agree to our <a href="/terms" className="text-[#2D1B0E] hover:text-[#C19A6B] font-semibold">Terms of Service</a> and <a href="/privacy" className="text-[#2D1B0E] hover:text-[#C19A6B] font-semibold">Privacy Policy</a>.
                </p>
            </aside>
        </div>
    );
}
