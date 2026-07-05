import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-slate-900 text-white p-6">

      <h1 className="text-2xl font-bold text-cyan-400 mb-10">
        TaskFlow
      </h1>

      <nav className="space-y-5">

        <Link
          href="/dashboard"
          className="block hover:text-cyan-400"
        >
          📊 Dashboard
        </Link>

        <Link
          href="/projects"
          className="block hover:text-cyan-400"
        >
          📁 Projects
        </Link>

        <Link
          href="/tasks"
          className="block hover:text-cyan-400"
        >
          ✅ Tasks
        </Link>

        <Link
          href="/profile"
          className="block hover:text-cyan-400"
        >
          👤 Profile
        </Link>

      </nav>

    </aside>
  );
}