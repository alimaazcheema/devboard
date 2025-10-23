"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
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

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });

    if (res?.ok) router.push("/dashboard");
    else setError("Invalid email or password");
  };

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-background text-foreground p-6 transition-colors">
      <Card className="max-w-lg w-full gap-6 border border-border bg-card text-card-foreground shadow-xl rounded-2xl transition-all duration-300 hover:shadow-2xl">
        {/* Header */}
        <CardHeader className="space-y-4 text-center p-8 pb-4">
          <CardTitle className="text-3xl font-bold text-primary">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Log in to access your dashboard
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

            <div className="grid gap-2 pb-2">
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
              className="w-full py-3 rounded-lg font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200 shadow-md mt-2"
            >
              Log In
            </Button>
          </form>
        </CardContent>

        {/* Footer */}
        <CardFooter className="flex flex-col items-center gap-3 px-8 pt-8">
          <p className="text-sm text-muted-foreground text-center">
            Don’t have an account?{" "}
            <button
              onClick={() => router.push("/auth/signup")}
              className="font-medium text-primary hover:underline"
            >
              Sign Up
            </button>
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}
