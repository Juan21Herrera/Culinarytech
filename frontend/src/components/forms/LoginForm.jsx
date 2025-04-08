import { useState } from "react";
import AuthCard from "./AuthCard";

export default function LoginForm() {

    const [form, setForm] = useState({
        email: '',
        password: '',
        remember: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Logging in with:", form)
    }


    return(

        <div className="min-h-screen flex flex-items justify-center bg-[ulr('/')] bg-cover bg-center relative">
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
            <div className="relative z-10 w-full max-w-md px-4">
                <AuthCard
                    title="Sign In"
                    footer={
                        <>
                            <p className="text-sm text-gray-600 text-center">
                                Don't have an account?
                                <a 
                                    href="/register" 
                                    className="text-purple-600 font-semibold hover:text-purple-700 ml-1"
                                >
                                    Register
                                </a>
                            </p>

                            <p className="text-xs text-center text-gray-500 pt-4">
                                By signing in, you agree to our
                                <a 
                                    href="/terms"
                                    className="text-purple-600 hover:text-purple-700 font-semibold mx-1"
                                >
                                    Terms of Service
                                </a>
                                and
                                <a 
                                    href="/privacy"
                                    className="text-purple-600 hover:text-purple-700 font-semibold ml-1"
                                >
                                    Privacy Policy
                                </a>
                            </p>
                        </>
                    }
                >
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
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

                        <div>
                            <label htmlFor="LoginPass" className="block text-sm">Password</label>
                            <input 
                                id="LoginPass"
                                type="password"
                                name="password"
                                value={from.password}
                                onChange={handleChange}
                                className="border border-gray-300 rounded w-full p-2 bg-transparent focus:ring-2 focus:ring-purple-500 outline-none" 
                            />
                        </div>

                        <div className="flex items-center text-sm">
                            <input 
                                id="LoginRemember"
                                type="checkbox"
                                name="remember"
                                checked={form.remember}
                                onChange={handleChange}
                                className="mr-2 accent-purple-600"
                            />
                            <label htmlFor="LoginRemember" className="text-gray-700">Remember Me</label>
                            <a 
                                href="/forgot-password"
                                className="ml-auto text-purple-600 hover:text-purple-700 font-semibold"
                            >
                                Forgot Password?
                            </a>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-purple-600 text-white hover:bg-purple-700 font-semibold py-2 px-4 rounded transition duration-300"
                        >
                            Sign In
                        </button>
                    </form>
                </AuthCard>
            </div>
        </div>

    );
}
