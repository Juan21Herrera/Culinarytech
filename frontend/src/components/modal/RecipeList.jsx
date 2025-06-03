import React, { useState } from "react";
import RecipeModal from "./RecipeModal";

export default function RecipeList({ recipes }) {
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="cursor-pointer border rounded-lg overflow-hidden shadow hover:shadow-lg transition"
            onClick={() => setSelectedRecipe(recipe)}
          >
            <img
              src={recipe.img}
              alt={recipe.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-medium">{recipe.title}</h3>
            </div>
          </div>
        ))}
      </div>

      <RecipeModal
        recipe={selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
      />
    </>
  );
}
