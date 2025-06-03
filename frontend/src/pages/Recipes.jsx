import { useState, useEffect } from "react";
import Navbar from "../components/static/Navbar";
import Footer from "../components/static/Footer";

export default function Recipes() {
  const [searchTitle, setSearchTitle] = useState("");
  const [similarRecipes, setSimilarRecipes] = useState([]);
  const [randomRecipes, setRandomRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearchSimilar = async (e) => {
  e.preventDefault();
  if (!searchTitle) return;

  setLoading(true);
  try {
    const recipeId = 1;
    const response = await fetch(
      `http://127.0.0.1:8000/recipes/${recipeId}/similar_recipes?title=${encodeURIComponent(searchTitle)}&number=9`
    );

    if (!response.ok) {
      throw new Error("No similar recipes found.");
    }

    const data = await response.json();
    console.log("Similar recipes:", data);
    setSimilarRecipes(data.similar_recipes);  // Aquí accedemos al array de recetas similares
  } catch (error) {
    console.error("Error fetching similar recipes:", error);
    setSimilarRecipes([]); // Limpia los resultados si hay error
  } finally {
    setLoading(false);
  }
};

  const fetchData = async () => {
  setLoading(true);
  try {
    const randomRes = await fetch(
      "http://localhost:8000/recipes/random?number=9"
    );
    const randomData = await randomRes.json();

    setRandomRecipes(randomData);
  } catch (error) {
    console.error("Error fetching recipes:", error);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#FFFACD] to-[#D4ECDD] text-black pt-20">
      <Navbar />
      <main className="flex-grow max-w-6xl mx-auto px-4 py-10">
        <section className="text-center mb-10">
          <h1 className="text-4xl font-bold">Similar Recipes</h1>
        </section>
        <form onSubmit={handleSearchSimilar} className="flex gap-4 mb-6">
          <input
            type="text"
            placeholder="Search similar recipes by title..."
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
            className="border backdrop-blur-lg bg-white/70 border-none rounded-full p-3 text-center shadow-2xl w-200"
          />
          <button
            type="submit"
            className="cursor-pointer bg-gray-900 hover:bg-gray-400 text-white px-5 py-2 transition rounded-md text-lg font-semibold"
          >
            Search Similar
          </button>
        </form>

        {similarRecipes.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-center mb-6">
              🔗 Similar Recipes for "{searchTitle}"
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {similarRecipes.map((recipe, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:scale-105 transition cursor-pointer"
                >
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-40 object-cover"
                  />
                  <h3 className="text-xl font-semibold text-center p-4">
                    {recipe.title}
                  </h3>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="mb-12">
            <div className="border-t pt-6 mt-20 border-gray-500">
  <h2 className="text-3xl font-bold text-center mb-6">
    🎲 Random Recipes
  </h2>
  </div>

  <div className="flex justify-center mb-10">
    <button 
      type="button"
      onClick={fetchData}
      className="cursor-pointer bg-gray-900 hover:bg-gray-400 text-white px-5 py-2 transition rounded-md text-md font-semibold">
      Search Random 
    </button>
  </div>

  {loading && <p className="text-center">Loading...</p>}
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {randomRecipes.map((recipe, index) => (
      <div
        key={index}
        className="bg-white rounded-lg shadow-lg overflow-hidden hover:scale-105 transition cursor-pointer"
      >
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-40 object-cover"
        />
        <h3 className="text-xl font-semibold text-center p-4">
          {recipe.title}
        </h3>
      </div>
    ))}
  </div>
</section>
      </main>
      <Footer />
    </div>
  );
}
