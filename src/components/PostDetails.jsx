import React, { useMemo } from "react";
import { useTheme } from "../context/ThemeContext";
// TODO: Exercice 3 - Importer useTheme

/**
 * Composant d'affichage détaillé d'un post
 * @param {Object} props - Propriétés du composant
 * @param {Object} props.post - Le post à afficher
 * @param {Function} props.onClose - Fonction pour fermer les détails
 * @param {Function} props.onTagClick - Fonction appelée lors du clic sur un tag
 */
function PostDetails({ post, onClose, onTagClick }) {
  // TODO: Exercice 3 - Utiliser le hook useTheme

  // TODO: Exercice 3 - Utiliser useMemo pour calculer les classes CSS
  const { theme } = useTheme();
  const themeClasses = useMemo(() => {
    return {
      card: theme === "dark" ? "bg-dark text-white" : "",
      badge: theme === "dark" ? "bg-primary" : "",
      button: theme === "dark" ? "bg-primary" : "",
    };
  }, [theme]);

  if (!post) return null;

  return (
    <div className={`card mb-4 ${themeClasses.card} `}>
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="card-title mb-0">{post.title}</h5>
        <button
          className={`btn btn-sm ${themeClasses.button}`}
          onClick={onClose}
          aria-label="Fermer"
        >
          <i className="bi bi-x-lg"></i>
        </button>
      </div>

      <div className="card-body">
        <p>{post.body}</p>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <span className="me-2"> {post.reactions.likes} likes</span>
            <span className="me-2"> {post.reactions.dislikes} dislikes</span>
            <span> {post.userId} user</span>
          </div>
          <div>{post.tags && post.tags.map((tag) => tag)}</div>
        </div>
        {/* TODO: Exercice 4 - Afficher le contenu du post */}
        {/* TODO: Exercice 4 - Afficher les réactions et l'utilisateur */}
        {/* TODO: Exercice 4 - Afficher les tags */}
      </div>
    </div>
  );
}

// TODO: Exercice 3 - Utiliser React.memo pour optimiser les rendus
export default PostDetails;
