import { useState, useEffect } from "react";

/**
 * Hook personnalisé pour gérer le stockage local
 * @param {string} key - La clé de stockage local
 * @param {any} initialValue - La valeur initiale si rien n'est trouvé dans localStorage
 * @returns {[any, function]} Valeur stockée et fonction pour la mettre à jour
 */
function useLocalStorage(key, initialValue) {
  // TODO: Exercice 2 - Implémenter le hook useLocalStorage
  const [value, setValue] = useState(() => {
    let currenValue;
    try {
      currenValue = JSON.parse(
        localStorage.getItem(key) || String(initialValue)
      );
    } catch (error) {
      currenValue = initialValue;
    }
    return currenValue;
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue]; // À modifier
}

export default useLocalStorage;
