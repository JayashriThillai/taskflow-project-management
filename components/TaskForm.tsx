"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function TaskForm() {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [dueTime, setDueTime] = useState("");
  const [priority, setPriority] = useState("Medium");

  async function handleAddTask(e: React.FormEvent) {
    e.preventDefault();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Please login.");
      return;
    }

    const { error } = await supabase.from("tasks").insert({
      title,
      due_date: dueDate,
      due_time: dueTime,
      priority,
      completed: false,
      project_id: "7cc081aa-34d4-4a6d-890c-2ee8ec753962",
      user_id: user.id,
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert("✅ Task Added!");

    setTitle("");
    setDueDate("");
    setDueTime("");
    setPriority("Medium");
  }

  return (
    <div className="bg-slate-900 rounded-xl p-6 mt-10">
      <h2 className="text-2xl font-bold text-white mb-4">
        Add Task
      </h2>

      <form onSubmit={handleAddTask} className="space-y-4">

        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 rounded-lg bg-slate-800 text-white"
          required
        />

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full p-3 rounded-lg bg-slate-800 text-white"
          required
        />

        <input
          type="time"
          value={dueTime}
          onChange={(e) => setDueTime(e.target.value)}
          className="w-full p-3 rounded-lg bg-slate-800 text-white"
          required
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full p-3 rounded-lg bg-slate-800 text-white"
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-400 text-black py-3 rounded-lg font-semibold"
        >
          Add Task
        </button>

      </form>
    </div>
  );
}