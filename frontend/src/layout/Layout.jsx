
// Import static components
import Navbar from "./static/Navbar"
import Footer from "./static/Footer"

export default function layout ({ children }) {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow flex-1 relative">
                {children}
            </main>
            <Footer />
        </div>

    )
}