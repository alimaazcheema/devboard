"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface Project {
  id: number;
  name: string;
  description?: string;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [projects, setProjects] = useState<Project[]>([]);
  const [newProject, setNewProject] = useState({ name: "", description: "" });
  const [editing, setEditing] = useState<Project | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/auth/login");
    else if (status === "authenticated") fetchProjects();
  }, [status]);

  const fetchProjects = async () => {
    const res = await fetch("/api/projects");
    const data = await res.json();
    setProjects(data);
  };

  const handleCreate = async () => {
    if (!newProject.name.trim()) return;
    await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProject),
    });
    setNewProject({ name: "", description: "" });
    fetchProjects();
  };

  const handleDelete = async (id: number) => {
    await fetch("/api/projects", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchProjects();
  };

  const handleEdit = async () => {
    if (!editing) return;
    await fetch("/api/projects", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing),
    });
    setEditing(null);
    fetchProjects();
  };

  if (status === "loading") {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <main className="flex flex-col items-center justify-start min-h-screen bg-background text-foreground p-8">
      <div className="w-full max-w-3xl flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold">
          Welcome, {session?.user?.name || "User"} 👋
        </h1>
        <Button
          className="bg-green-800 hover:bg-green-900 text-white font-medium px-5 py-2 rounded-md transition"
          onClick={() => signOut()}
        >
          Logout
        </Button>
      </div>

      <Card className="w-full max-w-3xl mb-10 border-border bg-card text-card-foreground shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Add New Project</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Project name"
            value={newProject.name}
            onChange={(e) =>
              setNewProject({ ...newProject, name: e.target.value })
            }
          />
          <Textarea
            placeholder="Project description"
            value={newProject.description}
            onChange={(e) =>
              setNewProject({ ...newProject, description: e.target.value })
            }
          />
          <Button
            onClick={handleCreate}
            className="bg-green-700 hover:bg-green-800 text-white font-semibold px-5 py-2 w-full rounded-md transition"
          >
            Add Project
          </Button>
        </CardContent>
      </Card>

      <Separator className="my-6 w-full max-w-3xl" />

      <div className="w-full max-w-3xl space-y-4">
        {projects.length === 0 && (
          <p className="text-center text-gray-500 italic">No projects yet.</p>
        )}
        {projects.map((project) => (
          <Card
            key={project.id}
            className="border-border bg-card text-card-foreground shadow-sm hover:shadow-lg transition"
          >
            <CardContent className="p-5 flex flex-col gap-3">
              {editing?.id === project.id ? (
                <div className="space-y-3">
                  <Input
                    value={editing.name}
                    onChange={(e) =>
                      setEditing({ ...editing, name: e.target.value })
                    }
                    placeholder="Project name"
                  />
                  <Textarea
                    value={editing.description || ""}
                    onChange={(e) =>
                      setEditing({ ...editing, description: e.target.value })
                    }
                    placeholder="Project description"
                  />
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={handleEdit}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      Save
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setEditing(null)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div>
                    <h3 className="text-lg font-semibold">{project.name}</h3>
                    {project.description && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {project.description}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2 justify-end">
                    <Button
                      size="sm"
                      className="bg-green-600 hover:bg-green-700 text-white"
                      onClick={() => setEditing(project)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(project.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
