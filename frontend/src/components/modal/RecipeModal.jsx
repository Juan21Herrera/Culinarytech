import React from 'react';

const RecipeModal = ({ recipe, onClose }) => {
  if (!recipe) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-11/12 md:w-2/3 lg:w-1/2 relative">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl"
          onClick={onClose}
        >
          &times;
        </button>
        <img
          src={recipe.image || 'https://via.placeholder.com/400'}
          alt={recipe.name}
          className="w-full h-60 object-cover rounded-lg mb-4"
        />
        <h2 className="text-2xl font-bold mb-2">{recipe.name}</h2>
        <h3 className="text-lg font-semibold">Ingredientes:</h3>
        <ul className="list-disc pl-5 mb-4">
          {recipe.ingredients?.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
        <h3 className="text-lg font-semibold">Instrucciones:</h3>
        <p>{recipe.instructions || 'Instrucciones no disponibles.'}</p>
      </div>
    </div>
  );
};

export default RecipeModal;
