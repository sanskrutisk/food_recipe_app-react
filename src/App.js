import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./client/components/Header";
import RecipeList from "./client/components/RecipeList";
import FavoriteRecipes from "./pages/FavoriteRecipes";

function App() {
  return (
    <div className="App">
      <Header /> {/* ✅ Header for navigation */}
      <Routes>
        <Route path="/" element={<RecipeList />} />
        <Route path="/favorites" element={<FavoriteRecipes />} />
      </Routes>
    </div>
  );
}

export default App;
