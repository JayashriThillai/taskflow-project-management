import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import DashboardCards from "@/components/DashboardCards";
import ProjectForm from "@/components/ProjectForm";
import ProjectList from "@/components/ProjectList";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-slate-950">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <main className="p-8">
          <h1 className="text-3xl font-bold text-white mb-6">
            🚀 TaskFlow Dashboard
          </h1>

          <DashboardCards />

          <ProjectForm />

          <ProjectList />

          <TaskForm />

          <TaskList />
        </main>
      </div>
    </div>
  );
}