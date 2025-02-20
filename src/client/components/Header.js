import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <nav className="p-4 bg-gray-200">
      <Link
        to="/"
        className="px-4 py-2 bg-green-500 text-white rounded inline-block mr-2"
      >
        📜 View All Recipes
      </Link>
      <Link
        to="/favorites"
        className="px-4 py-2 bg-blue-500 text-white rounded inline-block"
      >
        ❤️ View Favorites
      </Link>
    </nav>
  );
}

export default Header;
