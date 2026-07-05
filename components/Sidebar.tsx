"use client";

import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white p-6">

      <h1 className="text-3xl font-bold text-cyan-400 mb-10">
        TaskFlow
      </h1>

      <nav className="space-y-6 text-xl">

        <Link
          href="/dashboard"
          className="block hover:text-cyan-400"
        >
          📊 Dashboard
        </Link>

        <Link
          href="/dashboard#projects"
          className="block hover:text-cyan-400"
        >
          📁 Projects
        </Link>

        <Link
          href="/dashboard#tasks"
          className="block hover:text-cyan-400"
        >
          ✅ Tasks
        </Link>

        <Link
          href="/dashboard#profile"
          className="block hover:text-cyan-400"
        >
          👤 Profile
        </Link>

      </nav>

    </aside>
  );
}