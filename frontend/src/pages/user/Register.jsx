import RegisterForm from '../../components/auth/RegisterForm';
// import Navbar from '@/components/Navbar';
// import Footer from '@/components/Footer';

function Register() {
    return (
        <>
            {/* <Navbar /> */}
            <main className="flex justify-center items-center min-h-screen bg-purple-50">
                <RegisterForm />
            </main>
            {/* <Footer /> */}
        </>
    );
}

export default Register;