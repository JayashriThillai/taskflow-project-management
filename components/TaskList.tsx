"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Task = {
  id: string;
  title: string;
  due_date: string;
  due_time: string;
  priority: string;
  completed: boolean;
};

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    setTasks(data || []);
  }

  async function toggleTask(id: string, completed: boolean) {
    await supabase
      .from("tasks")
      .update({ completed: !completed })
      .eq("id", id);

    fetchTasks();
  }

  async function deleteTask(id: string) {
    const ok = confirm("Delete this task?");

    if (!ok) return;

    await supabase
      .from("tasks")
      .delete()
      .eq("id", id);

    fetchTasks();
  }

  return (
    <div className="bg-slate-900 rounded-xl p-6 mt-10">
      <h2 className="text-2xl font-bold text-white mb-6">
        My Tasks
      </h2>

      {tasks.length === 0 ? (
        <p className="text-slate-400">No tasks added yet.</p>
      ) : (
        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="bg-slate-800 rounded-lg p-4 border border-slate-700"
            >
              <div className="flex justify-between items-center">
                <h3
                  className={`text-lg font-semibold ${
                    task.completed
                      ? "line-through text-slate-500"
                      : "text-white"
                  }`}
                >
                  {task.title}
                </h3>

                <button
                  onClick={() => deleteTask(task.id)}
                  className="bg-red-600 hover:bg-red-500 px-3 py-1 rounded"
                >
                  🗑
                </button>
              </div>

              <p className="text-slate-300 mt-2">
                📅 {task.due_date}
              </p>

              <p className="text-slate-300">
                ⏰ {task.due_time}
              </p>

              <p className="text-slate-300">
                🚩 {task.priority}
              </p>

              <button
                onClick={() =>
                  toggleTask(task.id, task.completed)
                }
                className="mt-4 bg-green-500 hover:bg-green-400 text-black px-4 py-2 rounded"
              >
                {task.completed ? "Undo" : "Mark Complete"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}