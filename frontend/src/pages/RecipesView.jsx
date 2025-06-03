import React, { useState, useEffect } from 'react';
import RecipeCard from '../components/ui/RecipeCard';
import RecipeModal from '../components/modal/RecipeModal';

const RecipesView = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    // Reemplaza esta URL con la de tu backend
    fetch('https://culinarytech-backend.onrender.com/recipes/{recipe_id}/similar_recipes')
      .then((res) => res.json())
      .then((data) => setRecipes(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50 p-4">
      <h1 className="text-3xl font-bold text-center my-6">Explorar Recetas</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {recipes.map((recipe, i) => (
          <RecipeCard key={i} recipe={recipe} onClick={setSelectedRecipe} />
        ))}
      </div>
      <RecipeModal recipe={selectedRecipe} onClose={() => setSelectedRecipe(null)} />
    </div>
  );
};

export default RecipesView;
