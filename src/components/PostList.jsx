import React, { useEffect } from "react";
// TODO: Exercice 3 - Importer useTheme
// TODO: Exercice 4 - Importer useIntersectionObserver
import LoadingSpinner from "./LoadingSpinner";
import PostDetails from "./PostDetails";
import { useTheme } from "../context/ThemeContext";
import useIntersectionObserver from "../hooks/useIntersectionObserver";

/**
 * Composant d'affichage de la liste des posts
 * @param {Object} props - Propriétés du composant
 * @param {Array} props.posts - Liste des posts à afficher
 * @param {boolean} props.loading - Indicateur de chargement
 * @param {boolean} props.hasMore - Indique s'il y a plus de posts à charger
 * @param {Function} props.onLoadMore - Fonction pour charger plus de posts
 * @param {Function} props.onPostClick - Fonction appelée au clic sur un post
 * @param {Function} props.onTagClick - Fonction appelée au clic sur un tag
 * @param {boolean} props.infiniteScroll - Mode de défilement infini activé ou non
 */
function PostList({
  posts = [],
  loading = false,
  hasMore = false,
  onLoadMore,
  onPostClick,
  onTagClick,
  infiniteScroll = true,
}) {
  // TODO: Exercice 3 - Utiliser le hook useTheme

  // TODO: Exercice 4 - Utiliser useIntersectionObserver pour le défilement infini
  const [moreLoadRef, isIntersected] = useIntersectionObserver({
    enabled: infiniteScroll,
  });

  // TODO: Exercice 3 - Utiliser useCallback pour les gestionnaires d'événements
  const handlePostClick = (post) => {
    if (onPostClick) {
      onPostClick(post);
    }
  };

  const handleTagClick = (e, tag) => {
    e.stopPropagation(); // Éviter de déclencher le clic sur le post
    if (onTagClick) {
      onTagClick(tag);
    }
  };
  useEffect(() => {
    if (isIntersected && !loading && infiniteScroll && hasMore) {
      console.log("Intersection détectée, chargement de plus de posts...");
      onLoadMore();
    }
  }, [isIntersected, loading, infiniteScroll, hasMore, onLoadMore]);

  // TODO: Exercice 1 - Gérer le cas où il n'y a pas de posts
  return (
    <div className={`post-list  `}>
      {posts && posts.map((post) => <PostDetails key={post.id} post={post} />)}

      {/* Afficher le spinner de chargement */}
      {loading && <LoadingSpinner />}

      {/* TODO: Exercice 4 - Ajouter la référence pour le défilement infini */}
      {infiniteScroll && (
        <div
          style={{ height: "1px", marginBottom: "100px" }}
          ref={moreLoadRef}
        ></div>
      )}
      {/* TODO: Exercice 1 - Ajouter le bouton "Charger plus" pour le mode non-infini */}
      {!infiniteScroll && hasMore && (
        <div className="text-center mt-3">
          <button
            onClick={onLoadMore}
            disabled={loading}
            className="btn btn-primary"
          >
            {loading ? "Chargement..." : "Charger plus"}
          </button>
        </div>
      )}
    </div>
  );
}

// TODO: Exercice 3 - Utiliser React.memo pour optimiser les rendus
export default PostList;
