'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) router.push("/auth/login");
    else {
      const data = await res.json();
      setError(data.error || "Signup failed");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center">
      <form onSubmit={handleSubmit} className="border p-8 rounded-lg space-y-4">
        <h1 className="text-2xl font-bold mb-2">Create Account</h1>
        {error && <p className="text-red-500">{error}</p>}
        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="border p-2 w-72 rounded"
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          className="border p-2 w-72 rounded"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="border p-2 w-72 rounded"
          required
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">
          Sign Up
        </button>
      </form>
    </main>
  );
}
