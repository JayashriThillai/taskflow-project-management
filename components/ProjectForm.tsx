"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ProjectForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [dueTime, setDueTime] = useState("");
  const [priority, setPriority] = useState("Medium");

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Please login first.");
      return;
    }

    const { error } = await supabase.from("projects").insert({
      title,
      description,
      due_date: dueDate,
      due_time: dueTime,
      priority,
      user_id: user.id,
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Project added successfully!");

    setTitle("");
    setDescription("");
    setDueDate("");
    setDueTime("");
    setPriority("Medium");
  };

  return (
    <div className="bg-slate-900 rounded-xl p-6 mt-8">
      <h2 className="text-2xl font-bold text-white mb-4">
        Add New Project
      </h2>

      <form onSubmit={handleAddProject} className="space-y-4">

        <input
          type="text"
          placeholder="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 rounded-lg bg-slate-800 text-white border border-slate-700"
          required
        />

        <textarea
          placeholder="Project Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 rounded-lg bg-slate-800 text-white border border-slate-700"
          rows={4}
        />

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full p-3 rounded-lg bg-slate-800 text-white border border-slate-700"
          required
        />

        <input
          type="time"
          value={dueTime}
          onChange={(e) => setDueTime(e.target.value)}
          className="w-full p-3 rounded-lg bg-slate-800 text-white border border-slate-700"
          required
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full p-3 rounded-lg bg-slate-800 text-white border border-slate-700"
        >
          <option value="Low">🟢 Low</option>
          <option value="Medium">🟡 Medium</option>
          <option value="High">🔴 High</option>
        </select>

        <button
          type="submit"
          className="w-full bg-cyan-500 hover:bg-cyan-400 text-black px-6 py-3 rounded-lg font-semibold"
        >
          Add Project
        </button>

      </form>
    </div>
  );
}