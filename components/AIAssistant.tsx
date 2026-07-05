"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Task = {
  title: string;
  priority: string;
  completed: boolean;
  due_date: string;
};

type Project = {
  title: string;
  completed: boolean;
};

export default function AIAssistant() {
  const [message, setMessage] = useState("Loading AI Insights...");

  useEffect(() => {
    generateInsights();
  }, []);

  async function generateInsights() {
    const { data: tasks } = await supabase
      .from("tasks")
      .select("*");

    const { data: projects } = await supabase
      .from("projects")
      .select("*");

    if (!tasks || !projects) {
      setMessage("Unable to generate insights.");
      return;
    }

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(
      (t) => t.completed
    ).length;

    const pendingTasks = totalTasks - completedTasks;

    const highPriority = tasks.filter(
      (t) => !t.completed && t.priority === "High"
    );

    const today = new Date().toISOString().split("T")[0];

    const dueToday = tasks.filter(
      (t) => !t.completed && t.due_date === today
    );

    const completedProjects = projects.filter(
      (p) => p.completed
    ).length;

    const productivity =
      totalTasks === 0
        ? 100
        : Math.round((completedTasks / totalTasks) * 100);

    let advice = "";

    if (dueToday.length > 0) {
      advice = `🔴 Finish "${dueToday[0].title}" today. It is due today.`;
    } else if (highPriority.length > 0) {
      advice = `🟠 High priority task: "${highPriority[0].title}" should be completed first.`;
    } else if (pendingTasks > 0) {
      advice = `🟡 You have ${pendingTasks} pending tasks. Try completing a few today.`;
    } else {
      advice = "🎉 Excellent! Everything is completed.";
    }

    setMessage(`
📁 Projects : ${projects.length}
✅ Completed Projects : ${completedProjects}

📝 Tasks : ${totalTasks}
✔ Completed Tasks : ${completedTasks}
⏳ Pending Tasks : ${pendingTasks}

📈 Productivity : ${productivity}%

${advice}
`);
  }

  return (
    <div className="bg-gradient-to-r from-cyan-600 to-blue-700 rounded-xl p-6 text-white shadow-xl mt-10">
      <h2 className="text-2xl font-bold mb-4">
        🤖 AI Productivity Assistant
      </h2>

      <pre className="whitespace-pre-wrap text-lg font-medium">
        {message}
      </pre>
    </div>
  );
}