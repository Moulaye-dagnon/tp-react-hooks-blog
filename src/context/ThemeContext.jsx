import React, { createContext, useCallback, useContext, useMemo } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
// TODO: Exercice 2 - Importer useLocalStorage

// Créer le contexte
const ThemeContext = createContext();

/**
 * Provider pour le contexte de thème
 * @param {Object} props - Propriétés du composant
 * @param {React.ReactNode} props.children - Enfants du provider
 */
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useLocalStorage("theme", "light");

  // TODO: Exercice 3 - Utiliser useLocalStorage pour persister le thème
  // TODO: Exercice 3 - Ajouter la fonction pour basculer entre les thèmes

  const ThemeToggle = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }, [setTheme]);
  // Valeur fournie par le contexte

  const value = { theme, ThemeToggle };
  // TODO: Exercice 3 - Fournir les valeurs et fonctions nécessaires

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

/**
 * Hook personnalisé pour utiliser le contexte de thème
 * @returns {Object} Contexte de thème
 */
export function useTheme() {
  // TODO: Exercice 3 - Implémenter le hook useTheme

  return useContext(ThemeContext); // À modifier
}

export default ThemeContext;
