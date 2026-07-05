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
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1">
        <Navbar />

        <main className="p-8 space-y-12">

          {/* Dashboard */}
          <section id="dashboard">
            <h1 className="text-4xl font-bold text-white mb-6">
              🚀 TaskFlow Dashboard
            </h1>

            <DashboardCards />
          </section>

          {/* Projects */}
          <section id="projects">
            <h2 className="text-3xl font-bold text-cyan-400 mb-6">
              📁 Projects
            </h2>

            <ProjectForm />

            <div className="mt-8">
              <ProjectList />
            </div>
          </section>

          {/* Tasks */}
          <section id="tasks">
            <h2 className="text-3xl font-bold text-green-400 mb-6">
              ✅ Tasks
            </h2>

            <TaskForm />

            <div className="mt-8">
              <TaskList />
            </div>
          </section>

          {/* Profile */}
          <section
            id="profile"
            className="bg-slate-900 rounded-xl p-8"
          >
            <h2 className="text-3xl font-bold text-purple-400 mb-4">
              👤 Profile
            </h2>

            <p className="text-white text-lg">
              Welcome to <strong>TaskFlow</strong>.
            </p>

            <p className="text-slate-400 mt-2">
              Manage your projects and tasks efficiently.
            </p>
          </section>

        </main>
      </div>
    </div>
  );
}