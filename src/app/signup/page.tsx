"use client";

import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useState } from "react";
import { AUTH_BACKGROUND_GIF } from "../config/auth";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({ email, password });
    setLoading(false);
    if (error) {
      setMessage({ type: "error", text: error.message });
      return;
    }
    if (data?.user?.identities?.length === 0) {
      setMessage({ type: "error", text: "An account with this email already exists. Try signing in." });
      return;
    }
    if (data.user && !data.session) {
      setMessage({
        type: "success",
        text: "Check your email for the confirmation link to activate your account.",
      });
      return;
    }
    window.location.href = "/";
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-slate-900 px-4 bg-cover bg-center"
      style={{ backgroundImage: `url(${AUTH_BACKGROUND_GIF})` }}
    >
      <div className="absolute inset-0 bg-slate-900/70 pointer-events-none" aria-hidden />
      <div className="relative z-10 w-full max-w-sm rounded-2xl border border-white/10 bg-slate-800/90 shadow-2xl backdrop-blur-xl p-8">
        <h1 className="text-2xl font-bold tracking-tight text-white mb-1">
          MyCoreSkills
        </h1>
        <p className="text-slate-400 text-sm mb-8">
          Create your student account
        </p>
        <form onSubmit={handleSignUp} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1.5">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="w-full px-3 py-2.5 rounded-xl bg-slate-900/80 border border-slate-600 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
              placeholder="you@school.edu"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-1.5">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              autoComplete="new-password"
              className="w-full px-3 py-2.5 rounded-xl bg-slate-900/80 border border-slate-600 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
              placeholder="At least 6 characters"
            />
          </div>
          {message && (
            <p
              className={`text-sm ${
                message.type === "error" ? "text-red-400" : "text-emerald-400"
              }`}
            >
              {message.text}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800 disabled:opacity-50 disabled:pointer-events-none shadow-lg hover:shadow-blue-500/20 transition-all"
          >
            {loading ? "Creating account…" : "Create account"}
          </button>
        </form>
        <p className="mt-6 text-center text-slate-400 text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-400 font-medium hover:text-blue-300 transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
