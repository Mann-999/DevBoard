import { useState, useEffect } from "react"

const MODES = {
  focus: 25 * 60,
  short: 5 * 60,
  long: 15 * 60
}

function PomodoroTimer() {
  const [mode, setMode] = useState("focus")
  const [seconds, setSeconds] = useState(MODES.focus)
  const [running, setRunning] = useState(false)

  // ✅ FIX: declare BEFORE using it
  const [focusTime, setFocusTime] = useState(
    Number(localStorage.getItem("focusTime")) || 0
  )

  useEffect(() => {
    setSeconds(MODES[mode])
    setRunning(false)
  }, [mode])

  useEffect(() => {
    if (!running) return

    const interval = setInterval(() => {
      setSeconds(prev => {
        if (prev === 0) {
          clearInterval(interval)
          setRunning(false)

          // ✅ track focus time ONLY for focus mode
          if (mode === "focus") {
            setFocusTime(f => {
              const updated = f + 25
              localStorage.setItem("focusTime", updated)
              return updated
            })
          }

          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [running, mode])

  function reset() {
    setRunning(false)
    setSeconds(MODES[mode])
  }

  const minutes = Math.floor(seconds / 60)
  const secs = seconds % 60

  return (
    <div className="bg-gray-900 p-5 rounded-2xl shadow-lg hover:shadow-indigo-500/10 transition">

      <h2 className="text-sm uppercase text-gray-400 mb-4">Pomodoro</h2>

      {/* MODE SWITCH */}
      <div className="flex justify-center gap-2 mb-4">
        <button onClick={() => setMode("focus")} className="bg-gray-700 px-3 py-1 rounded text-xs">Focus</button>
        <button onClick={() => setMode("short")} className="bg-gray-700 px-3 py-1 rounded text-xs">Short</button>
        <button onClick={() => setMode("long")} className="bg-gray-700 px-3 py-1 rounded text-xs">Long</button>
      </div>

      <div className="text-5xl font-bold text-center my-6 tracking-widest">
        {String(minutes).padStart(2, "0")}:{String(secs).padStart(2, "0")}
      </div>

      {/* ✅ NEW: focus tracking */}
      <p className="text-center text-sm text-gray-400 mb-4">
        Total Focus: {focusTime} min
      </p>

      <div className="flex justify-center gap-3">
        <button onClick={() => setRunning(true)} className="bg-indigo-600 px-4 py-2 rounded-lg text-sm hover:bg-indigo-500">Start</button>
        <button onClick={() => setRunning(false)} className="bg-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-600">Pause</button>
        <button onClick={reset} className="bg-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-600">Reset</button>
      </div>

    </div>
  )
}

export default PomodoroTimer