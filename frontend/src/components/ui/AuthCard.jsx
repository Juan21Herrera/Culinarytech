
import Navbar from "../../layout/static/Navbar";
import Footer from "../../layout/static/Footer";

const AuthCard = ({ children, showRightSection = true }) => {
    return (
        <div className='flex flex-col min-h-screen'>
        <Navbar />
        <main 
            className={`grid ${showRightSection ? 'md:grid-cols-2' : 'grid-cols-1'} flex-grow min-h-screen w-full bg-cover bg-center bg-no-repeat`}
            style={{ backgroundImage: showRightSection ? "url('/food.jpg')" : 'none' }}>
            {/* Izquierda */}
            <section
                className='bg-gradient-to-br from-[#FFFACD] to-[#D4ECDD] opacity-92 backdrop-blur-[30px] flex items-center justify-center'
                aria-label='Authentication Form'
            >

                <div className='w-full max-w-xl p-8'>
                    {children}
                </div>
            </section>

            {/* Derecha */}
            {showRightSection && (
                <section
                    className='flex items-center justify-center'
                    aria-label='Welcome grid'
                >
                    <h2 className='text-5xl text-white font-semibold text-center'>
                        Welcome to <strong>Culinarytech</strong> Web
                    </h2>
                </section>
            )}
        </main>
        <Footer />
        </div>
    );
};

export default AuthCard;
