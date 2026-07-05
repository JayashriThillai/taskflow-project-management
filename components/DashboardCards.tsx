"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function DashboardCards() {
  const [totalProjects, setTotalProjects] = useState(0);
  const [completedProjects, setCompletedProjects] = useState(0);
  const [activeProjects, setActiveProjects] = useState(0);
  const [totalTasks, setTotalTasks] = useState(0);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const { data: projects } = await supabase
      .from("projects")
      .select("completed");

    const { data: tasks } = await supabase
      .from("tasks")
      .select("id");

    const completed = projects?.filter(
      (p) => p.completed
    ).length || 0;

    setTotalProjects(projects?.length || 0);
    setCompletedProjects(completed);
    setActiveProjects((projects?.length || 0) - completed);
    setTotalTasks(tasks?.length || 0);
  }

  const cards = [
    {
      title: "Projects",
      value: totalProjects,
      color: "text-cyan-400",
      icon: "📁",
    },
    {
      title: "Completed",
      value: completedProjects,
      color: "text-green-400",
      icon: "✅",
    },
    {
      title: "Active",
      value: activeProjects,
      color: "text-yellow-400",
      icon: "🟢",
    },
    {
      title: "Tasks",
      value: totalTasks,
      color: "text-purple-400",
      icon: "📝",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-slate-900 rounded-xl p-6 shadow-lg"
        >
          <div className="flex justify-between items-center">
            <h3 className="text-slate-400">
              {card.title}
            </h3>

            <span className="text-2xl">
              {card.icon}
            </span>
          </div>

          <p
            className={`text-4xl font-bold mt-4 ${card.color}`}
          >
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}