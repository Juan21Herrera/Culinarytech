
import { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/static/Navbar';
import Footer from '../components/static/Footer';

const Fridge = () => {
  const [input, setInput] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAddIngredient = () => {
    const newIngredient = input.trim();
    if (newIngredient && !ingredients.includes(newIngredient)) {
      setIngredients([...ingredients, newIngredient]);
      setInput('');
    }
  };

  const handleRemoveIngredient = (ingredient) => {
    setIngredients(ingredients.filter((item) => item !== ingredient));
  };

  const handleSearchRecipes = async () => {
    if (ingredients.length === 0) {
      setError('Agrega al menos un ingrediente');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const response = await axios.get('https://culinarytech-backend.onrender.com/recipes/ingredients/', {
        params: { ingredients: ingredients.join(',') },
      });
      setRecipes(response.data);
    } catch (err) {
      setError('No se encontraron recetas o hubo un error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-20 flex flex-col min-h-screen bg-gradient-to-br from-[#FFFACD] to-[#D4ECDD] text-black">
        <Navbar />
    <main className="flex-grow">
    <section className="flex flex-col items-center px-4 py-10">
      <h1 className="text-5xl font-bold text-center mb-4 drop-shadow-lg mb-10">¿What's in your fridge?</h1>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Añade un ingrediente..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border backdrop-blur-lg bg-white/70 border-none rounded-full p-3 w-80 text-center shadow-2xl w-150"
        />
        <button onClick={handleAddIngredient} className="bg-green-600 hover:bg-green-500 cursor-pointer transition text-white px-4 rounded-xl hover:scale-102 ml-3">
          Add
        </button>
      </div>

      {ingredients.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {ingredients.map((ingredient, index) => (
            <span key={index} className="bg-gray-200 shadow-lg text-gray-900 px-3 py-1 hover:scale-101 transition cursor-pointer rounded-full flex items-center">
              {ingredient}
              <button
                onClick={() => handleRemoveIngredient(ingredient)}
                className="ml-2 text-red-600 hover:text-red-800 cursor-pointer"
              >
                ✖
              </button>
            </span>
          ))}
        </div>
      )}

      <button
        onClick={handleSearchRecipes}
        className="cursor-pointer bg-gray-900 hover:bg-gray-700 text-white px-5 py-2 rounded-md text-md font-semibold transition hover:scale-101"
      >
        Search recipes
      </button>

      {loading && <p className="mt-4 text-center">Buscando recetas...</p>}
      {error && <p className="mt-4 text-center text-red-600">{error}</p>}

      {recipes.length > 0 && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-10">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="p-4 rounded shadow hover:shadow-lg transition bg-gray-200 w-100">
              <img src={recipe.image} alt={recipe.title} className="w-full h-40 object-cover rounded    " />
              <h3 className="text-lg font-semibold mt-2">{recipe.title}</h3>
              <p className="text-sm text-gray-600">
                Ingredientes usados: {recipe.usedIngredientCount} | Ingredientes faltantes: {recipe.missedIngredientCount}
              </p>
              <a
                href={`https://spoonacular.com/recipes/${recipe.title.replace(/ /g, "-")}-${recipe.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline mt-2 inline-block"
              >
                Ver receta
              </a>
            </div>
          ))}
        </div>
        
      )}
      </section>
    </main>
    <Footer />
    </div>
  );
};

export default Fridge;
