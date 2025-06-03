import Navbar from "../components/static/Navbar"
import Footer from "../components/static/Footer"

export default function Ingredients(){
    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#FFFACD] to-[#D4ECDD] text-black pt-20">
            <Navbar />
            <main className="flex-grow">
                <section className="max-w-5xl mx-auto">
                    <h1 className="text-center text-4xl pt-10 font-bold">INGREDIENTS</h1>
                    
                </section>
            </main>
            <Footer />
        </div>
    )
}