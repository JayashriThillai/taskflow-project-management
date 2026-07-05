"use client";

import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <header className="bg-slate-900 h-16 border-b border-slate-800 flex items-center justify-between px-8">

      <h2 className="text-xl font-semibold text-white">
        Dashboard
      </h2>

      <div className="flex items-center gap-4">

        <span className="text-slate-300">
          Welcome, Shri 👋
        </span>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-400 px-4 py-2 rounded-lg text-white"
        >
          Logout
        </button>

      </div>

    </header>
  );
}