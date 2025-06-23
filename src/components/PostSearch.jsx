import React, { useCallback, useState } from "react";
import { useTheme } from "../context/ThemeContext";
// TODO: Exercice 3 - Importer useTheme

/**
 * Composant de recherche de posts
 * @param {Object} props - Propriétés du composant
 * @param {Function} props.onSearch - Fonction appelée lors de la saisie
 * @param {Function} props.onTagSelect - Fonction appelée lors de la sélection d'un tag
 * @param {Array} props.availableTags - Liste des tags disponibles
 * @param {string} props.selectedTag - Tag actuellement sélectionné
 */
function PostSearch({
  onSearch,
  onTagSelect,
  availableTags = [],
  selectedTag = "",
}) {
  const [searchInput, setSearchInput] = useState("");

  // TODO: Exercice 3 - Utiliser le hook useTheme

  // TODO: Exercice 3 - Utiliser useCallback pour optimiser le gestionnaire
  const handleSearchChange = useCallback(
    (e) => {
      const value = e.target.value;
      setSearchInput(value);
      onSearch(value);
    },
    [onSearch]
  );
  const handleClearSearch = useCallback(() => {
    setSearchInput("");
    onSearch("");
  }, [onSearch]);
  const handleTagChange = useCallback(
    (e) => {
      const tag = e.target.value;
      onTagSelect(tag);
    },
    [onTagSelect]
  );
  const { theme } = useTheme();
  // TODO: Exercice 3 - Appliquer les classes CSS en fonction du thème
  const themeClasses =
    theme === "dark" ? "bg-dark text-white border-secondary" : "";
  return (
    <div className="mb-4">
      <div className="row">
        <div className="col-md-8 mb-3 mb-md-0">
          <div className={`input-group ${themeClasses}`}>
            <span className="input-group-text">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Rechercher des articles..."
              value={searchInput}
              onChange={handleSearchChange}
              aria-label="Rechercher"
            />
            {searchInput && (
              <button
                className="btn btn-outline-secondary"
                onClick={handleClearSearch}
              >
                Effacer
              </button>
            )}
            {/* TODO: Exercice 1 - Ajouter le bouton pour effacer la recherche */}
          </div>
        </div>
        <div className="col-md-4">
          <select
            className={`form-select ${themeClasses}`}
            value={selectedTag}
            onChange={handleTagChange}
          >
            <option value="">Tous les tags</option>
            {availableTags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>
        {/* TODO: Exercice 4 - Ajouter le sélecteur de tags */}
      </div>
    </div>
  );
}

// TODO: Exercice 3 - Utiliser React.memo pour optimiser les rendus
export default React.memo(PostSearch);
