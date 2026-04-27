import { useState } from "react"
import TaskList from "./components/TaskList"
import PomodoroTimer from "./components/PomodoroTimer"
import NotesPanel from "./components/NotesPanel"
import ThemeToggle from "./components/ThemeToggle"
import "./index.css"

function App() {
  function toggleTheme() {
    setTheme(prev => prev === "light" ? "dark" : "light")
  }

  return (
  <div className="min-h-screen bg-gray-950 text-white px-6 py-8">

    {/* HEADER */}
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold tracking-wide">FocusBoard</h1>
        <p className="text-sm text-gray-400">Build. Focus. Repeat.</p>
      </div>
    </div>

    {/* GRID */}
    <div className="grid md:grid-cols-2 gap-6">
      <TaskList />
      <PomodoroTimer />
      <NotesPanel />
    </div>

  </div>
)
}

export default App