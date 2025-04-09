import { useState } from 'react';


// This code defines a simple login form using React. It uses the useState hook to manage the form state, and handles changes and submission of the form. The form includes fields for email and password, and a submit button. The styling is done using Tailwind CSS classes.




export default function LoginForm() {
    const [form, setForm] = useState({
        email: '',
        password: ''
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(
            (prev) => ({ ...prev, [name]: value })
        )
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login logic here
        console.log('Logging in with:', form);
    };


    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8">
            <h2 className="text-2xl font-semibold mb-6 text-center text-purple-700">Sign in</h2>
        <form clasName="bg-white p-8 rounded shadow-lg w-full max-w-sm">


            <div className="mb-4">
                <label htmlFor="LoginEmail" className="block text-sm">Email</label>
                <input
                id="LoginEmail"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="border border-gray-300 rounded w-full p-2 bg-transparent focus:ring-2 focus:ring-purple-500 outline-none"
                />
            </div>


            <div className="mb-4">
                <label htmlFor="LoginPass" className="block text-sm">Password</label>
                <input
                id="LoginPass"
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="border border-gray-300 rounded w-full p-2 bg-transparent focus:ring-2 focus:ring-purple-500 outline-none"
                />
            </div>


            <div className='mb-4 flex items-center'>
                <input
                id="LoginRemember"
                type="checkbox"
                name="remember"
                className="mr-2 accent-purple-600"
                />
                <label htmlFor="LoginRemember" className="text-sm text-gray-700">Remember Me</label>
            </div>


            <button
                type="submit"
                className="w-full bg-purple-600 text-white hover:bg-purple-700 font-semibold py-2 px-4 rounded transition duration-300"
            >
                Sign In
            </button>
        </form>


        <aside className="mt-4 text-sm text-gray-600">
            <p className="flex justify-between mb-2">
                <a href="/forgot-password" className="text-purple-600 hover:text-purple-700 font-semibold text-start">Forgot Password?</a>
                <p>Don't have an account?
                <a href="/Register" className="text-purple-600 hover:text-purple-700 font-semibold text-end"> Register</a>
                </p>
            </p>
            <p className='text-center text-gray-500 pt-4'>
                By signing in, you agree to our <a href="/terms" className="text-purple-600 hover:text-purple-700 font-semibold">Terms of Service</a> and <a href="/privacy" className="text-purple-600 hover:text-purple-700 font-semibold">Privacy Policy</a>.
            </p>
        </aside>


            </div>
        </div>
    );


}