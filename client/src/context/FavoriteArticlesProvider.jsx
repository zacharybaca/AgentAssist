/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { FavoriteArticlesContext } from "./FavoriteArticlesContext";

export const FavoriteArticlesProvider = ({ children }) => {
  const [favoriteArticles, setFavoriteArticles] = useState([]);
  const token = localStorage.getItem("token");

  const fetchFavoriteArticles = async (userId) => {
    try {
      const res = await fetch(`/api/agents/favorite-articles/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setFavoriteArticles(data);
    } catch (err) {
      console.error("Failed to fetch favorite articles:", err);
    }
  };

  const toggleFavorite = async (articleId) => {
    const isFavorited = favoriteArticles.includes(articleId);
    const updatedFavorites = isFavorited
      ? favoriteArticles.filter((id) => id !== articleId)
      : [...favoriteArticles, articleId];

    // Optimistically update UI
    setFavoriteArticles(updatedFavorites);

    try {
      const res = await fetch(`/api/agents/favorite-articles/${articleId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedFavorites),
      });

      if (!res.ok) throw new Error("Failed to toggle favorite");
      const updatedAgent = await res.json();

      // Update with actual backend data
      setFavoriteArticles(updatedAgent.favoriteArticles);
    } catch (err) {
      console.error("Toggle favorite failed:", err);
      // Revert optimistic update if error occurs
      setFavoriteArticles(favoriteArticles);
    }
  };

  useEffect(() => {
    fetchFavoriteArticles();
  }, [favoriteArticles]);

  return (
    <FavoriteArticlesContext.Provider
      value={{ favoriteArticles, fetchFavoriteArticles, toggleFavorite }}
    >
      {children}
    </FavoriteArticlesContext.Provider>
  );
};
