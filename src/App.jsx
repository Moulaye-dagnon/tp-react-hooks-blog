import React, { useCallback, useMemo, useState } from "react";
import "./App.css";
import PostList from "./components/PostList";
import PostSearch from "./components/PostSearch";
import usePosts from "./hooks/usePosts";
import ThemeToggle from "./components/ThemeToggle";
import { useTheme } from "./context/ThemeContext";
import useLocalStorage from "./hooks/useLocalStorage";
// TODO: Exercice 3 - Importer ThemeToggle
// TODO: Exercice 3 - Importer ThemeProvider et useTheme
// TODO: Exercice 1 - Importer le hook usePosts
// TODO: Exercice 2 - Importer le hook useLocalStorage

function App() {
  // État local pour la recherche
  const [searchTerm, setSearchTerm] = useState("");
  const [scrollMode, setScrollMode] = useLocalStorage("scroll", "infinite");
  const [Tagselected, setTagSelected] = useState("");
  const [page, setPage] = useState(1);

  // TODO: Exercice 4 - Ajouter l'état pour le tag sélectionné

  // TODO: Exercice 1 - Utiliser le hook usePosts pour récupérer les posts
  const { posts, loading, error, loadMore, hasMore } = usePosts({
    searchTerm,
    tag: Tagselected,
    limit: 10,
  });

  // TODO: Exercice 2 - Utiliser useLocalStorage pour le mode de défilement

  // TODO: Exercice 3 - Utiliser useCallback pour les gestionnaires d'événements

  // Gestionnaire pour la recherche
  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };
  const handleScrollModeChange = useCallback((c) => {
    setScrollMode(c);
  }, []);
  const handleLoadMore = useCallback(() => {
    if (loadMore && !loading) {
      loadMore();
    }
  }, [loadMore, loading]);
  const { theme } = useTheme();
  // TODO: Exercice 4 - Ajouter le gestionnaire pour la sélection de tag
  const handleTagSelected = useCallback((tag) => {
    setTagSelected(tag);
  }, []);
  return (
    <div className={`container py-4 ${theme === "dark" && "sombre"} `}>
      <header className="pb-3 mb-4 border-bottom">
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="display-5 fw-bold">Blog</h1>
          <ThemeToggle />
        </div>
      </header>

      <main>
        <PostSearch
          onTagSelect={handleTagSelected}
          onSearch={handleSearchChange}
          selectedTag={Tagselected}
          availableTags={["science", "post"]}
        />

        {/* TODO: Exercice 1 - Afficher un message d'erreur si nécessaire */}

        {/* TODO: Exercice 4 - Ajouter le composant PostDetails */}

        {/* TODO: Exercice 1 - Passer les props nécessaires à PostList */}
        <PostList
          posts={posts}
          loading={loading}
          hasMore={hasMore}
          onLoadMore={handleLoadMore}
          onTagClick={handleTagSelected}
          infiniteScroll={scrollMode === "infinite"}
        />
      </main>

      <footer className="pt-3 mt-4 text-center border-top">
        <p>TP React Hooks - Blog &middot; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

export default App;
