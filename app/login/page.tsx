"use client";

"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
const router = useRouter();

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    alert(error.message);
    return;
  }

  alert("Login Successful!");
  router.push("/dashboard");
};
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-slate-900 rounded-2xl p-8 shadow-lg">

        <h1 className="text-3xl font-bold text-center text-cyan-400">
          Welcome Back 
        </h1>

        <p className="text-slate-400 text-center mt-2 mb-8">
          Sign in to continue
        </p>

        <form onSubmit={handleLogin} className="space-y-5">

        <input
  type="email"
  placeholder="Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none"
  required
/>

          <input
  type="password"
  placeholder="Password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white outline-none"
  required
/>

          <button
  type="submit"
  className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-semibold py-3 rounded-xl"
>
  Login
</button>

        </form>

        <p className="text-center text-slate-400 mt-6">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="text-cyan-400 hover:underline"
          >
            Sign Up
          </Link>
        </p>

      </div>
    </div>
  );
}