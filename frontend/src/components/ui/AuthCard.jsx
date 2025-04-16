import React from 'react';

const AuthCard = ({ children }) => {

    return (
        <main
            className='grid grid-cols-1 md:grid-cols-2 grid-rows-1 min-h-screen w-full bg-cover bg-center bg-no-repeat'
            style={{ backgroundImage: "url('/food.jpg')" }}
        >

            <section
                className='bg-[#efefef] flex items-center justify-center opacity-94'
                aria-label='Authentication Form'
            >
                <div>
                    {/* {children} */}
                </div>

            </section>


            <section 
                className='flex items-center justify-center'
                aria-label='Welcome grid'
            >
                <h2 className='text-3xl text-white font-semibold'>
                    Welcome to <strong>Culinarytech</strong> Web
                </h2>
            </section>

        </main>
    );
};

export default AuthCard