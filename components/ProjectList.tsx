"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Project = {
  id: string;
  title: string;
  description: string;
  due_date: string;
  due_time: string;
  priority: string;
  completed: boolean;
};

export default function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    const { data } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    setProjects(data || []);
  }

  async function toggleComplete(id: string, completed: boolean) {
    await supabase
      .from("projects")
      .update({ completed: !completed })
      .eq("id", id);

    fetchProjects();
  }

  async function deleteProject(id: string) {
    if (!confirm("Delete this project?")) return;

    await supabase
      .from("projects")
      .delete()
      .eq("id", id);

    fetchProjects();
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-white mb-6">
        My Projects
      </h2>

      <div className="space-y-5">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-slate-900 rounded-xl p-6"
          >
            <h3
              className={`text-2xl font-bold ${
                project.completed
                  ? "line-through text-gray-500"
                  : "text-cyan-400"
              }`}
            >
              {project.title}
            </h3>

            <p className="text-slate-300 mt-2">
              {project.description}
            </p>

            <div className="mt-4 space-y-2 text-white">

              <p>📅 {project.due_date}</p>

              <p>⏰ {project.due_time}</p>

              <p>🚩 {project.priority}</p>

              <p>
                {project.completed
                  ? "✅ Completed"
                  : "🟢 Active"}
              </p>

            </div>

            <div className="flex gap-3 mt-5">

              <button
                onClick={() =>
                  toggleComplete(
                    project.id,
                    project.completed
                  )
                }
                className="bg-green-500 hover:bg-green-400 text-black px-4 py-2 rounded-lg"
              >
                {project.completed
                  ? "↩ Undo"
                  : "✔ Complete"}
              </button>

              <button
                onClick={() =>
                  deleteProject(project.id)
                }
                className="bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded-lg"
              >
                🗑 Delete
              </button>

            </div>

          </div>
        ))}
      </div>
    </div>
  );
}