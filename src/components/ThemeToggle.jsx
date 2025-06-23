import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { ThemeToggle, theme } = useTheme();
  return (
    <button onClick={ThemeToggle}>
      {theme === "light" ? "Clair" : "Sombre"}
    </button>
  );
}
