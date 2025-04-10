import React from 'react';

const AuthCard = ({ children }) => {
    return (
        <main className='grid grid-cols-1 md:grid-cols-2 w-screen h-screen'>
            <section className='bg-red flex items-center justify-center'>
                <p>Forms</p>
            </section>
            <section className='bg-blue'>
                <p>Design</p>
            </section>
        </main>
    );
};

export default AuthCard