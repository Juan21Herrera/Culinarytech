import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/static/Navbar.jsx";
import Footer from "../components/static/Footer.jsx";

export default function Home() {
  const [filters, setFilters] = useState({
    meal_type: "",
    diet: "",
    prep_time: "",
    exclude_ingredients: "",
  });

  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const resultsPerPage = 9;

  const handleSearch = async (event) => {
    event.preventDefault();
    if (!searchTerm) return;

    try {
      const response = await fetch(
        `https://culinarytech-backend.onrender.com/recipes/search/${searchTerm}?number=10`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch recipes");
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
  const currentResults = searchResults.slice(
    indexOfFirstResult,
    indexOflastResult
  );
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
          <p className="mt-4 text-2xl text-gray-700 p-5">
            Explore recipes and ingredients
          </p>

          <form onSubmit={handleSearch} className="mb-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name or ingredient..."
              className="border backdrop-blur-lg bg-white/70 border-none rounded-full p-3 text-center shadow-2xl w-200 "
            />

            <div className="flex flex-wrap gap-4 mt-4 justify-center">
              {/* Meal Type */}
              <select
                name="meal_type"
                value={filters.meal_type}
                onChange={(e) =>
                  setFilters({ ...filters, meal_type: e.target.value })
                }
                className="hover:bg-white transition shadow p-2 rounded-md bg-white/70 w-35"
              >
                <option value="">All meals</option>
                <option value="desayuno">Desayuno</option>
                <option value="almuerzo">Almuerzo</option>
                <option value="cena">Cena</option>
                <option value="onces">Onces</option>
              </select>

              {/* Diet */}
              <select
                name="diet"
                value={filters.diet}
                onChange={(e) =>
                  setFilters({ ...filters, diet: e.target.value })
                }
                className="hover:bg-white transition shadow p-2 rounded-md bg-white/70 w-35"
              >
                <option value="">All diets</option>
                <option value="vegano">Vegano</option>
                <option value="vegetariano">Vegetariano</option>
                <option value="sinGluten">Sin Gluten</option>
              </select>

              {/* Prep Time */}
              <select
                name="prep_time"
                value={filters.prep_time}
                onChange={(e) =>
                  setFilters({ ...filters, prep_time: e.target.value })
                }
                className="hover:bg-white transition shadow p-2 rounded-md bg-white/70 w-35"
              >
                <option value="">Any prep time</option>
                <option value="10-60">10-60 min</option>
                <option value="60-90">60-90 min</option>
                <option value="+90">+90 min</option>
              </select>

              {/* Exclude Ingredients */}
              <input
                type="text"
                placeholder="Exclude ingredients (e.g., carne, huevo)"
                value={filters.exclude_ingredients}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    exclude_ingredients: e.target.value,
                  })
                }
                className="hover:bg-white transition shadow p-2 rounded-md bg-white/70 w-72"
              />
            </div>
            <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-2">
              <button
                type="submit"
                className="cursor-pointer bg-gray-900 hover:bg-gray-400 text-white px-5 py-2 mt-4 transition rounded-md text-md font-semibold"
              >
                Search
              </button>
            </div>
          </form>

          {searchResults.length === 0 && searchTerm && (
            <p className="mt-10 text-lg text-gray-600">
              No recipes found for "{searchTerm}".
            </p>
          )}

          {currentResults.length > 0 && (
            <>
              <div className="w-full flex items-center justify-center my-8 px-4">
                <div className="flex-grow h-px bg-gray-400 max-w-sm" />
                <h1 className="mx-4 text-shadow-lg text-4xl font-bold text-gray-800">
                  {" "}
                  🍽️ Recipes
                </h1>
                <div className="flex-grow h-px bg-gray-400 max-w-sm" />
              </div>
              <div className="mt-10 grid backdrop-blur-sm grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-6xl">
                {currentResults.map((result, index) => (
                  <div
                    key={index}
                    className="h-60 rounded-2xl bg-white shadow-xl hover:scale-105 transition-transform duration-300 cursor-pointer overflow-hidden relative group"
                  >
                    <img
                      src={result.image}
                      alt={result.title}
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-80  transition-opacity duration-300"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <h2 className="text-xl font-bold text-white drop-shadow-md">
                        {result.title}
                      </h2>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-center mt-8 space-x-2">
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
          <div className="w-full flex items-center justify-center my-8 px-4">
            <div className="flex-grow h-px bg-gray-400 max-w-sm" />
            <h1 className="mx-4 text-shadow-lg text-4xl font-bold text-gray-800">
              {" "}
              EXPLORE OUR SECTIONS
            </h1>
            <div className="flex-grow h-px bg-gray-400 max-w-sm" />
          </div>

          <div className="max-w-5xl mx-auto mt-10 w-full grid grid-cols-4 grid-rows-2 gap-10">
            {/* Card 1 */}
            <div
              onClick={() => navigate("/fridge")}
              className="col-span-2 h-60 rounded-2xl bg-white shadow-xl hover:scale-105 transition-transform duration-300 cursor-pointer overflow-hidden relative group"
            >
              <img
                src="https://blog.haceb.com/sites/default/files/styles/articulo_home/public/imagenes/articulos/2023-11/vegetales-Haceb_0.jpg.webp?itok=6LMnyNso"
                alt="What's in your fridge"
                className="w-full h-full object-cover opacity-90 group-hover:opacity-80  transition-opacity duration-300"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <h1 className="text-2xl font-bold text-white drop-shadow-md ">
                  What's in your fridge
                </h1>
              </div>
            </div>

            {/* Card 2 */}
            <div
              onClick={() => navigate("/recipes")}
              className="col-span-2 col-start-3 h-60 bg-white shadow-xl hover:scale-105 transition-transform duration-300 rounded-xl cursor-pointer overflow-hidden relative group"
            >
              <img
                src="/recipes.png"
                alt=""
                className="w-full h-full object-cover opacity-90 group-hober:opacity-80 transition-opacity duration-300"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <h1 className="text-2xl font-bold text-white drop-shadow-md ">
                  Recipes
                </h1>
              </div>
            </div>

            {/* Card 3 */}
            <div
              onClick={() => navigate("/only-ingredients")}
              className="col-span-2 col-start-2 row-start-2 h-60 bg-white shadow-xl hover:scale-105 transition-transform duration-300 cursor-pointer rounded-xl     overflow-hidden relative group"
            >
              <img
                src="/ingredientes.png"
                alt=""
                className="w-full h-full object-cover opacity-90 group-hover:opacity-80  transition-opacity duration-300"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <h1 className="text-2xl font-bold text-white drop-shadow-md">
                  Ingredients
                </h1>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
