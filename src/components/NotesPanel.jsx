import { useState, useEffect } from "react"

function NotesPanel() {
  const [note, setNote] = useState("")

  useEffect(() => {
    const saved = localStorage.getItem("devboard-note")
    if (saved) setNote(saved)
  }, [])

  function handleChange(e) {
  const value = e.target.value
  setNote(value)

  setTimeout(() => {
    localStorage.setItem("devboard-note", value)
  }, 300)
}

  return (
  <div className="bg-gray-900 p-5 rounded-2xl shadow-lg hover:shadow-indigo-500/10 transition">

    <h2 className="text-sm uppercase text-gray-400 mb-4">Quick Notes</h2>

    <textarea
      className="w-full bg-gray-800 p-3 rounded-lg outline-none text-sm resize-none"
      value={note}
      onChange={handleChange}
      placeholder="Write something..."
      rows={6}
    />

  </div>
)
}

export default NotesPanel