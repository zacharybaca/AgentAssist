import { useContext } from "react";
import { FavoriteArticlesContext } from "../context/FavoriteArticlesContext";

export const useToggleFavorite = () => useContext(FavoriteArticlesContext);
