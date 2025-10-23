import * as React from "react";
import { cn } from "@/lib/utils";

// 🪩 Card container
function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        // layout & colors
        "flex flex-col gap-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] text-[var(--card-foreground)]",
        // depth & motion
        "shadow-lg hover:shadow-[0_0_25px_var(--ring)] transition-all duration-300 backdrop-blur-md",
        // responsive padding (✅ FIXED HERE)
        "p-6 sm:p-8",
        // center card nicely (optional if used alone)
        "max-w-md mx-auto my-10",
        className
      )}
      {...props}
    />
  );
}

// 🧠 Card header
function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "flex flex-col items-center justify-center text-center space-y-2 pb-2",
        className
      )}
      {...props}
    />
  );
}

// 💬 Card title
function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <h2
      data-slot="card-title"
      className={cn(
        "text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--foreground)]",
        className
      )}
      {...props}
    />
  );
}

// 📝 Card description
function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <p
      data-slot="card-description"
      className={cn("text-sm sm:text-base text-[var(--foreground)]/70", className)}
      {...props}
    />
  );
}

// ⚡ Card action area
function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn("ml-auto flex items-center justify-end space-x-2", className)}
      {...props}
    />
  );
}

// 📦 Card content
function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("flex flex-col gap-5 mt-2", className)}
      {...props}
    />
  );
}

// 🔻 Card footer
function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 border-t border-[var(--border)] text-[var(--foreground)]/80",
        className
      )}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};
