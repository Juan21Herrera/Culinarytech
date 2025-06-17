import React from 'react';

const RecipeCard = ({ recipe, onClick }) => {
  return (
    <div
      className="bg-white shadow-md rounded-xl p-3 cursor-pointer hover:scale-105 transition"
      onClick={() => onClick(recipe)}
    >
      <img
        src={recipe.image || 'https://via.placeholder.com/150'}
        alt={recipe.name}
        className="w-full h-40 object-cover rounded-md"
      />
      <h2 className="mt-2 font-semibold text-center">{recipe.name}</h2>
    </div>
  );
};

export default RecipeCard;
