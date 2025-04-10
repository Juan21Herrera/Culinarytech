import React from 'react';

const ForgotForm = () => {
    return (
        <div>
            <h2 className='text-2xl font-bold text-gray-800 mb-6'>Forgot Password</h2>
            <form className='space-y-4'>
                <input 
                    type="email" 
                    placeholder='Enter your email' 
                    className='w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400'
                />
                <button
                    type='submit'
                    className='w-full bg-purple-500 hover:bg-purple-700 text-white py-3 rounded-lg transition'
                >
                    Send Reset Code
                </button>
            </form>
        </div>
    );
};

export default ForgotForm;