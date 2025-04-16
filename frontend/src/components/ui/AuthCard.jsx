import React from 'react';

const AuthCard = ({ children, showRightSection = true }) => {
    return (
        <main
            className={`grid ${showRightSection ? 'md:grid-cols-2' : 'grid-cols-1'} min-h-screen w-full bg-cover bg-center bg-no-repeat`}
            style={{ backgroundImage: showRightSection ? "url('/food.jpg')" : 'none' }}
        >
            {/* Izquierda */}
            <section
                className='bg-[#efefef] flex items-center justify-center opacity-94'
                aria-label='Authentication Form'
            >
                <div className='w-full max-w-md p-8'>
                    {children}
                </div>
            </section>

            {/* Derecha */}
            {showRightSection && (
                <section
                    className='flex items-center justify-center'
                    aria-label='Welcome grid'
                >
                    <h2 className='text-3xl text-white font-semibold text-center'>
                        Welcome to <strong>Culinarytech</strong> Web
                    </h2>
                </section>
            )}
        </main>
    );
};

export default AuthCard;
