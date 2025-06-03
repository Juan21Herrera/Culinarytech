import { useState } from "react";
import Navbar from "../components/static/Navbar";
import Footer from "../components/static/Footer";

export default function Ingredients() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [ingredientInfo, setIngredientInfo] = useState(null);
  const [substitutes, setSubstitutes] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm) return;

    try {
      const response = await fetch(
        `https://culinarytech-backend.onrender.com/ingredient/search?query=${encodeURIComponent(searchTerm)}`);
      const data = await response.json();

      const formatted = data.map((item) => ({
        ...item,
        image: `https://spoonacular.com/cdn/ingredients_100x100/${item.image}`,
      }));

      setSearchResults(formatted);
      setIngredientInfo(null);
      setSubstitutes([]);
    } catch (error) {
      console.error("Error searching ingredients:", error);
    }
  };

  const handleGetInfo = async (ingredientId) => {
    try {
      const response = await fetch(
        `https://culinarytech-backend.onrender.com/ingredient/info/${ingredientId}`
      );
      const data = await response.json();
      console.log("Ingredient Info:", data);

      setIngredientInfo(data);
    } catch (error) {
      console.error("Error fetching ingredient info:", error);
    }
  };

  const handleGetSubstitutes = async (ingredientName) => {
    try {
      const response = await fetch(
        `https://culinarytech-backend.onrender.com/ingredient/substitutes/${ingredientName}`
      );
      const data = await response.json();
      console.log("Substitutes:", data); 

      setSubstitutes(data.substitutes || []);
    } catch (error) {
      console.error("Error fetching substitutes:", error);
      setSubstitutes([]);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#FFFACD] to-[#D4ECDD] text-black pt-20">
      <Navbar />
      <main className="flex-grow max-w-5xl mx-auto px-4 py-10">
        <h1 className="sm:text-7xl font-bold text-center drop-shadow-lg mb-">
          Ingredients
        </h1>
        <p className="mt-4 text-2xl text-gray-700 p-5 text-center">
          Search ingredients to get ingredient info or substitutes
        </p>
        <form
          onSubmit={handleSearch}
          className="flex gap-4 justify-center mb-8"
        >
          <input
            type="text"
            placeholder="Search ingredients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border backdrop-blur-lg bg-white/70 border-none rounded-full p-3 text-center shadow-2xl w-150"
          />
          <button
            type="submit"
            className="cursor-pointer bg-gray-900 hover:bg-gray-400 text-white px-5 py-2 transition rounded-md text-md font-semibold"
          >
            Search
          </button>
        </form>
        <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-2"></div>

        {searchResults.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {searchResults.map((item) => (
              <div
                key={item.id}
                className="bg-white w-80 p-4 rounded-xl shadow hover:scale-105 hover:shadow-lg transition flex flex-col justify-between h-60"
              >
                <div>
                  <h2 className="text-lg font-bold text-center pb-4">
                    {item.name}
                  </h2>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="mx-auto object-cover opacity-90 group-hover:opacity-80 transition-opacity duration-300"
                  />
                </div>

                <div className="mt-auto flex justify-center gap-2 pt-4">
                  <button
                    onClick={() => handleGetInfo(item.id)}
                    className="bg-gray-600 cursor-pointer hover:bg-gray-500 transition hover:scale-104 text-white px-2 py-1 rounded text-sm w-24"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => handleGetSubstitutes(item.name)}
                    className="bg-black cursor-pointer hover:bg-black/80 transition hover:scale-104 text-white px-2 py-1 rounded text-sm w-24"
                  >
                    Substitutes
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {ingredientInfo && (
          <div className="bg-white shadow-lg rounded p-4 mt-4">
            <h3 className="text-lg font-semibold">{ingredientInfo.name}</h3>
            <img
              src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredientInfo.image}`}
              alt={ingredientInfo.name}
              className="w-24 h-24 object-cover mx-auto my-2"
            />
            <p>
              <strong>Calories:</strong> {ingredientInfo.calories ?? "N/A"}
            </p>
            <p>
              <strong>Carbs:</strong> {ingredientInfo.carbs ?? "N/A"} g
            </p>
            <p>
              <strong>Fat:</strong> {ingredientInfo.fat ?? "N/A"} g
            </p>
            <p>
              <strong>Protein:</strong> {ingredientInfo.protein ?? "N/A"} g
            </p>
          </div>
        )}

        {substitutes.length > 0 && (
          <div className="bg-white shadow-lg rounded p-4 mt-4">
            <h3 className="text-lg font-semibold">Substitutes</h3>
            <ul className="list-disc list-inside">
              {substitutes.map((sub, index) => (
                <li key={index}>{sub}</li>
              ))}
            </ul>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
