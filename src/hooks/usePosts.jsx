import { useState, useEffect } from "react";
import useDebounce from "./useDebounce";
// TODO: Exercice 2 - Importer useDebounce

/**
 * Hook personnalisé pour gérer les posts du blog
 * @param {Object} options - Options de configuration
 * @param {string} options.searchTerm - Terme de recherche
 * @param {string} options.tag - Tag à filtrer
 * @param {number} options.limit - Nombre d'éléments par page
 * @param {boolean} options.infinite - Mode de chargement infini vs pagination
 * @returns {Object} État et fonctions pour gérer les posts
 */
function usePosts({
  searchTerm = "",
  tag = "",
  limit = 10,
  infinite = true,
} = {}) {
  // État local pour les posts
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const debouncedValue = useDebounce(searchTerm);
  const [hasMore, setHasMore] = useState(true);
  // TODO: Exercice 1 - Ajouter les états nécessaires pour la pagination
  const [skip, setSkip] = useState(0);

  // TODO	: Exercice 4 - Ajouter l'état pour le post sélectionné

  // TODO: Exercice 2 - Utiliser useDebounce pour le terme de recherche
  //   const debouncedValue = useDebounce({ searchTerm });
  //   console.log(debouncedValue.searchTerm);

  // TODO: Exercice 3 - Utiliser useCallback pour construire l'URL de l'API
  const buildApiUrl = () => {
    // Construire l'URL en fonction des filtres
    if (debouncedValue)
      return `https://dummyjson.com/posts/search?q=${debouncedValue}&limit=${limit}&skip=${skip}`;
    return `https://dummyjson.com/posts?limit=${limit}&skip=${skip}`;
  };

  // TODO: Exercice 1 - Implémenter la fonction pour charger les posts
  const fetchPosts = async (reset = false) => {
    try {
      setLoading(true);
      fetch(buildApiUrl())
        .then((res) => res.json())
        .then((data) => {
          const newPosts = data.posts || [];

          setPosts((prev) => (reset ? newPosts : [...prev, ...newPosts]));

          // Vérifie s’il reste encore des posts à charger
          if (newPosts.length < limit) {
            setHasMore(false);
          } else {
            setHasMore(true);
          }
        });
      // Appeler l'API et mettre à jour les états
    } catch (err) {
      console.log(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // TODO: Exercice 1 - Utiliser useEffect pour charger les posts quand les filtres changent
  useEffect(() => {
    setSkip(0);
    setHasMore(true);
    fetchPosts(true);
  }, [debouncedValue]);

  useEffect(() => {
    if (skip > 0) {
      fetchPosts();
    }
  }, [skip]);
  // TODO: Exercice 4 - Implémenter la fonction pour charger plus de posts
  const loadMore = () => {
    setSkip((prev) => prev + limit);
  };

  // TODO: Exercice 3 - Utiliser useMemo pour calculer les tags uniques

  // TODO: Exercice 4 - Implémenter la fonction pour charger un post par son ID
  return {
    posts,
    loading,
    error,
    loadMore,
    hasMore,

    // Retourner les autres états et fonctions
  };
}

export default usePosts;
