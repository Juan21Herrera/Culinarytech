import LoginForm from '../../components/forms/LoginForm';
// import Navbar from '@/components/Navbar';
// import Footer from '@/components/Footer';

function Login() {
    return (
        <>
            {/* <Navbar /> */}
            <main className="flex justify-center items-center min-h-screen bg-purple-50">
                <LoginForm />
            </main>
            {/* <Footer /> */}
        </>
    );
}

export default Login;