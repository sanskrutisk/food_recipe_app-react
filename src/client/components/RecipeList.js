import React, { useState, useEffect } from "react";
import recipes from "../data/recipes.json";
import "./RecipeList.css";

const RecipeList = () => {
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [randomRecipe, setRandomRecipe] = useState(null);

  useEffect(() => {
    const results = recipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(searchTerm.toLowerCase().trim().replace(/\s+/g,""))
    );
    console.log(results);
    
    setFilteredRecipes(results);
  }, [searchTerm]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const addToFavorites = (recipe) => {
    const updatedFavorites = [...favorites, recipe];
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const removeFromFavorites = (id) => {
    const updatedFavorites = favorites.filter((recipe) => recipe.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const isFavorite = (id) => favorites.some((recipe) => recipe.id === id);

  // ✅ Function to get a random recipe
  const getRandomRecipe = () => {
    const randomIndex = Math.floor(Math.random() * recipes.length);
    setRandomRecipe(recipes[randomIndex]);
  };

  return (
    <div className="recipe-container">
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search recipes..."
        className="search-bar"
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Random Recipe Button */}
      <button className="random-button" onClick={getRandomRecipe}>
        🎲 Get Random Recipe
      </button>

      {/* Display Random Recipe if Selected */}
      {randomRecipe && (
        <div className="random-recipe-card">
          <h2>🍽️ Random Recipe: {randomRecipe.name}</h2>
          <img
            src={randomRecipe.image || "https://via.placeholder.com/300"}
            alt={randomRecipe.name}
            className="recipe-image"
          />
          <p className="recipe-cuisine">{randomRecipe.cuisine}</p>
          <h4>How to Make:</h4>
          <ul className="recipe-steps">
            {randomRecipe.instructions.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Recipe List */}
      <div className="recipe-grid">
        {filteredRecipes.map((recipe) => (
          <div key={recipe.id} className="recipe-card">
            <img
              src={recipe.image || "https://via.placeholder.com/300"}
              alt={recipe.name}
              className="recipe-image"
            />
            <h3 className="recipe-title">{recipe.name}</h3>
            <p className="recipe-cuisine">{recipe.cuisine}</p>
            <h4>How to Make:</h4>
            <ul className="recipe-steps">
              {recipe.instructions.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ul>

            {/* Favorite Button */}
            {isFavorite(recipe.id) ? (
              <button
                className="favorite-button remove"
                onClick={() => removeFromFavorites(recipe.id)}
              >
                💔 Remove from Favorites
              </button>
            ) : (
              <button
                className="favorite-button add"
                onClick={() => addToFavorites(recipe)}
              >
                ❤️ Add to Favorites
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
