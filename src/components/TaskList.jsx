import { useState, useEffect } from "react";

function TaskList() {
  // Professional Lazy Loading [cite: 25, 28]
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("dev-tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [input, setInput] = useState("");
  const [priority, setPriority] = useState("Medium");

  useEffect(() => {
    localStorage.setItem("dev-tasks", JSON.stringify(tasks));
  }, [tasks]);

  function addTask() {
    if (!input.trim()) return;
    const newTask = {
      id: Date.now(),
      text: input,
      priority: priority,
      done: false,
      timestamp: new Date().toLocaleTimeString(),
    };
    setTasks([newTask, ...tasks]);
    setInput("");
  }

  return (
    <div className="bg-gray-900 p-6 rounded-2xl shadow-2xl border border-gray-800">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-400">Task Matrix</h2>
        <span className="text-xs text-gray-500">{tasks.length} Active Tasks</span>
      </div>

      <div className="flex flex-col gap-3 mb-6">
        <div className="flex gap-2">
          <input
            className="flex-1 bg-gray-800 border border-gray-700 px-4 py-2 rounded-xl outline-none text-sm focus:border-indigo-500 transition-all"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
            placeholder="What needs to be done?"
          />
          <select 
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="bg-gray-800 border border-gray-700 px-2 py-2 rounded-xl text-xs outline-none"
          >
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </div>
        <button
          onClick={addTask}
          className="w-full bg-indigo-600 py-2 rounded-xl text-sm font-semibold hover:bg-indigo-500 shadow-lg shadow-indigo-900/20 active:scale-95 transition-all"
        >
          Add Task
        </button>
      </div>

      <ul className="space-y-3">
        {tasks.map(task => (
          <li key={task.id} className="group flex justify-between items-center p-3 bg-gray-800/40 rounded-xl border border-transparent hover:border-gray-700 transition-all">
            <div className="flex flex-col gap-1">
              <span
                onClick={() => setTasks(tasks.map(t => t.id === task.id ? { ...t, done: !t.done } : t))}
                className={`cursor-pointer text-sm ${task.done ? "line-through opacity-30" : "text-gray-200"}`}
              >
                {task.text}
              </span>
              <div className="flex gap-2 items-center">
                 <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                   task.priority === 'High' ? 'bg-red-900/30 text-red-400' : 
                   task.priority === 'Medium' ? 'bg-yellow-900/30 text-yellow-400' : 'bg-green-900/30 text-green-400'
                 }`}>
                   {task.priority}
                 </span>
                 <span className="text-[10px] text-gray-600">{task.timestamp}</span>
              </div>
            </div>

            <button
              onClick={() => setTasks(tasks.filter(t => t.id !== task.id))}
              className="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-red-400 transition-all"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;