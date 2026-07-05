"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Project = {
  id: string;
  title: string;
  description: string;
  status: string;
  due_date: string;
  due_time: string;
  priority: string;
};

export default function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setProjects(data);
    }
  }

  async function deleteProject(id: string) {
    const confirmDelete = confirm("Delete this project?");

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("projects")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    fetchProjects();
  }

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold text-white mb-6">
        My Projects
      </h2>

      <div className="grid gap-5">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-slate-900 rounded-xl p-6 border border-slate-800"
          >
            <h3 className="text-2xl font-bold text-cyan-400">
              {project.title}
            </h3>

            <p className="text-slate-300 mt-3">
              {project.description}
            </p>

            <div className="mt-4 space-y-2 text-slate-300">
              <p>📅 <strong>Due Date:</strong> {project.due_date || "Not set"}</p>
              <p>⏰ <strong>Due Time:</strong> {project.due_time || "Not set"}</p>
              <p>🚩 <strong>Priority:</strong> {project.priority}</p>
              <p>🟢 <strong>Status:</strong> {project.status}</p>
            </div>

            <button
              onClick={() => deleteProject(project.id)}
              className="mt-5 bg-red-600 hover:bg-red-500 px-5 py-2 rounded-lg text-white"
            >
              🗑 Delete Project
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}