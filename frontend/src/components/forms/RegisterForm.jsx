import { useState } from "react";
import { FcGoogle } from "react-icons/fc"; // Ícono oficial de Google

// This code defines a simple register form using React.
// It uses the useState hook to manage the form state, and handles changes and submission of the form.
// The form includes fields for email and password, and a submit button. The styling is done using Tailwind CSS classes.

export default function RegisterForm() {

    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });


    const [message, setMessage] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validaciones básicas
        if (!form.username || !form.email || !form.password || !form.confirmPassword) {
            setMessage({ type: 'error', text: 'All fields are required' });
            return;
        }
        if (form.password !== form.confirmPassword) {
            setMessage({ type: 'error', text: 'Passwords do not match' });
            return;
        }

        try {
            const response = await fetch('http://localhost:8000/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: form.username,
                    email: form.email,
                    password: form.password
                })
            });

            const data = await response.json();

            if (response.ok) {
                setMessage({ type: 'success', text: 'Registration successful! Redirecting...' });
                setTimeout(() => {
                    window.location.href = '/login'; // Redirige al login
                }, 2000);
            } else {
                setMessage({ type: 'error', text: data.message || 'Registration failed' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Server error. Try again later.' });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            {/* Contenedor transparente con desenfoque */}
            <div className="w-full max-w-lg bg-white/30 backdrop-blur-md border border-gray-300 rounded-2xl shadow-lg p-10">
                <h2 className="text-2xl text-purple-700 font-semibold mb-4 text-center text-gray-700">Sign Up</h2>

                {/* Formulario */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="RegisterUsername" className="block text-sm text-gray-700">Username</label>
                        <input
                            id="RegisterUsername"
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            className="border border-gray-300 rounded w-full p-2 bg-transparent focus:ring-2 focus:ring-purple-500 outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="RegisterEmail" className="block text-sm text-gray-700">Email</label>
                        <input
                            id="RegisterEmail"
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className="border border-gray-300 rounded w-full p-2 bg-transparent focus:ring-2 focus:ring-purple-500 outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="RegisterPass" className="block text-sm text-gray-700">Password</label>
                        <div className="relative">
                            <input
                                id="RegisterPass"
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                className="border border-gray-300 rounded w-full p-2 pr-10 bg-transparent focus:ring-2 focus:ring-purple-500 outline-none"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-purple-600 text-white hover:bg-purple-700 font-semibold py-2 px-4 rounded transition duration-300"
                    >
                        Sign Up
                    </button>
                </form>

                <aside className="mt-4 text-sm text-gray-600 text-center">
                    Already have an account?
                    <a href="/Login" className="text-purple-600 hover:text-purple-700 font-semibold ml-1">Log in</a>

                    <div className="flex items-center my-6">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="mx-4 text-gray-500">OR</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>

                {/* Botón de "Sign up with Google" con ícono */}
                <button className="flex items-center justify-center w-full border border-gray-300 p-2 rounded-lg shadow-sm hover:bg-gray-100 transition">
                    <FcGoogle size={24} className="mr-2" />
                    Sign up with Google
                </button>

                    <p className='text-center text-gray-500 pt-4'>
                By signing up, you agree to our <a href="/terms" className="text-purple-600 hover:text-purple-700 font-semibold">Terms of Service</a> and <a href="/privacy" className="text-purple-600 hover:text-purple-700 font-semibold">Privacy Policy</a>.
                    </p>
                </aside>

                
                
            </div>
        </div>
    );
}