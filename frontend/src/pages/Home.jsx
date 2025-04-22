import React, { useState } from 'react';
import Navbar from '../components/static/Navbar.jsx';
import Footer from '../components/static/Footer.jsx';

export default function Home() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const resultsPerPage = 9;

    const handleSearch = async (event) => {
        event.preventDefault();
        if (!searchTerm) return;

        try {
            const response = await fetch(`http://localhost:8000/recipes/search/${searchTerm}?number=40`);
            if (!response.ok) {
                throw new Error('Failed to fetch recipes');
            }

            const data = await response.json();

            const formattedResults = data.map((recipe) => ({
                title: recipe.title,
                description: recipe.description,
                image: recipe.image,
            }));

            setSearchResults(formattedResults);
            setCurrentPage(1);

        } catch (error) {
            console.error("Error searching recipes:", error);
        }
    };

    const indexOflastResult = currentPage * resultsPerPage;
    const indexOfFirstResult = indexOflastResult - resultsPerPage;
    const currentResults = searchResults.slice(indexOfFirstResult, indexOflastResult);
    const totalPages = Math.ceil(searchResults.length / resultsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="pt-20 flex flex-col min-h-screen bg-gradient-to-br from-[#FFFACD] to-[#D4ECDD] text-black">
            <Navbar />
            <main className="flex-grow">
                <section className="flex flex-col items-center px-4 py-10">
                    <h1 className="sm:text-7xl font-bold text-center drop-shadow-lg">
                        Welcome to CulinaryTech
                    </h1>
                    <p className='mt-4 text-2xl text-gray-700 p-5'>Explore recipes and ingredients</p>

                    <form onSubmit={handleSearch} className="mb-4">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search by name or ingredient..."
                            className="border backdrop-blur-lg bg-white/70 border-none rounded-full p-3 w-80 text-center shadow-2xl w-150 "
                        />
                        <div className='mt-5 flex flex-col sm:flex-row items-center justify-center gap-2'>
                            <button
                                type="submit"
                                className="cursor-pointer bg-gray-900 hover:bg-gray-400 text-white px-5 py-2 rounded-md text-md font-semibold">
                                Search
                            </button>
                        </div>
                    </form>

                    <div className="w-full flex items-center justify-center my-8 px-4">
                        <div className="flex-grow h-px bg-gray-400 max-w-sm" />
                        <h1 className="mx-4 text-shadow-lg text-4xl font-bold text-gray-800"> 🍽️ Recipes</h1>
                        <div className="flex-grow h-px bg-gray-400 max-w-sm" />
                    </div>

                    {searchResults.length === 0 && searchTerm && (
                        <p className="mt-10 text-lg text-gray-600">No recipes found for "{searchTerm}".</p>
                    )}

                    {currentResults.length > 0 && (
                        <>
                            <div className="mt-10 grid backdrop-blur-sm grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-6xl">
                                {currentResults.map((result, index) => (
                                    <div
                                    key={index}
                                    className="cursor-pointer bg-gray-700 hover:bg-gray-400 rounded-xl shadow-2xl overflow-hidden transition hover:scale-105"
                                  >
                                    <img
                                      src={result.image}
                                      alt={result.title}
                                      className="w-full h-40 object-cover"
                                    />
                                    <h2 className="text-xl font-bold text-white text-center py-2">
                                      {result.title}
                                    </h2>
                                  </div>
                                  
                                ))}
                            </div>

                            <div className='flex justify-center mt-8 space-x-2'>
                                {[...Array(totalPages)].map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => paginate(index + 1)}
                                        className={`px-4 py-2 rounded cursor-pointer ${
                                            currentPage === index + 1
                                                ? "bg-gray-900 text-white"
                                                : "bg-gray-300 text-black"
                                        }`}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                            </div>
                        </>
                    )}
                </section>
            </main>
            <Footer />
        </div>
    );
}
