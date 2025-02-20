import React, { useState, useEffect } from "react";

const FavoriteRecipes = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Favorite Recipes</h2>
      {favorites.length === 0 ? (
        <p>No favorite recipes yet.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {favorites.map((recipe) => (
            <div key={recipe.id} className="p-4 border rounded-lg">
              <img
                src={recipe.image}
                alt={recipe.name}
                className="w-full h-40 object-cover"
              />
              <h3 className="text-xl font-semibold mt-2">{recipe.name}</h3>
              <p className="text-gray-600">{recipe.cuisine}</p>
              <h4>How to Make:</h4>
            <ul className="favorite-steps">
              {recipe.instructions.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoriteRecipes;
