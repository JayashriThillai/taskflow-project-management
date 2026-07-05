"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function DashboardCards() {
  const [projects, setProjects] = useState(0);
  const [tasks, setTasks] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [pending, setPending] = useState(0);

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    const { count: projectCount } = await supabase
      .from("projects")
      .select("*", { count: "exact", head: true });

    const { data: taskData } = await supabase
      .from("tasks")
      .select("completed");

    setProjects(projectCount || 0);
    setTasks(taskData?.length || 0);
    setCompleted(taskData?.filter((t) => t.completed).length || 0);
    setPending(taskData?.filter((t) => !t.completed).length || 0);
  }

  const cards = [
    { title: "Projects", value: projects, color: "text-cyan-400" },
    { title: "Tasks", value: tasks, color: "text-green-400" },
    { title: "Completed", value: completed, color: "text-emerald-400" },
    { title: "Pending", value: pending, color: "text-yellow-400" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card) => (
        <div key={card.title} className="bg-slate-900 rounded-xl p-6">
          <h3 className="text-slate-400">{card.title}</h3>
          <p className={`text-4xl font-bold mt-2 ${card.color}`}>
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}