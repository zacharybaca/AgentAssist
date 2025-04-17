import { useContext } from "react";
import { ArticlesContext } from "../context/ArticlesContext";

export const useArticles = () => useContext(ArticlesContext);
