function ThemeToggle({ theme, toggleTheme }) {
  return (
    <button className="theme-btn" onClick={toggleTheme}>
      {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
    </button>
  )
}

export default ThemeToggle