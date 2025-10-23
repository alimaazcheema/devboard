'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
    <main className="flex min-h-screen w-full items-center justify-center bg-background text-foreground p-6">
      <Card className="max-w-lg gap-6 border border-border bg-card text-card-foreground shadow-xl rounded-2xl transition-all duration-300 hover:shadow-2xl">
        {/* Header */}
        <CardHeader className="space-y-4 text-center p-8 pb-4">
          <CardTitle className="text-3xl font-bold text-primary">
            Create Your Account
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Enter your details below to get started
          </CardDescription>
        </CardHeader>

        {/* Form */}
        <CardContent className="px-8 py-4">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {error && (
              <p className="text-sm text-center font-medium rounded-md border border-red-400 bg-red-100/60 text-red-700 p-2">
                {error}
              </p>
            )}

            <div className="grid gap-2 pb-4">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="John Doe"
                onChange={handleChange}
                required
                className="w-full border border-border bg-background text-foreground focus:ring-2 focus:ring-primary transition"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                onChange={handleChange}
                required
                className="w-full border border-border bg-background text-foreground focus:ring-2 focus:ring-primary transition"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                onChange={handleChange}
                required
                className="w-full border border-border bg-background text-foreground focus:ring-2 focus:ring-primary transition"
              />
            </div>

            <Button
              type="submit"
              className="w-full pt-6 py-3 rounded-lg font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200 shadow-md"
            >
              Sign Up
            </Button>
          </form>
        </CardContent>

        {/* Footer */}
        <CardFooter className="flex flex-col items-center gap-3 px-8 pt-8">
          <p className="text-sm text-muted-foreground text-center">
            Already have an account?{" "}
            <button
              onClick={() => router.push("/auth/login")}
              className="font-medium text-primary hover:underline"
            >
              Login
            </button>
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}
