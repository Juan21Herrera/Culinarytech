import React from "react";

export default function RecipeModal({ recipe, onClose }) {
  if (!recipe) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg max-w-lg w-full p-6 relative overflow-y-auto max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-xl font-bold"
          aria-label="Cerrar modal"
        >
          &times;
        </button>

        <img
          src={recipe.image.startsWith('http') ? recipe.image : `https://culinarytech-backend.onrender.com/${recipe.image}`}
          alt={recipe.title}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
        <h2 className="text-2xl font-semibold mb-3">{recipe.title}</h2>

        <p className="font-semibold">Ingredientes:</p>
        <ul className="list-disc list-inside mb-4">
          {recipe.ingredients?.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>

        <p className="font-semibold">Tiempo de preparación:</p>
        <p className="mb-4">{recipe.prepTime || recipe.readyInMinutes + " minutos"}</p>

        <p className="font-semibold">Instrucciones:</p>
        <p>{recipe.instructions || recipe.summary || "No hay instrucciones disponibles."}</p>
      </div>
    </div>
  );
}
