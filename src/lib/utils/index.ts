import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTimeAgo(date: Date): string {
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;

  return date.toLocaleDateString();
}

export function formatDate(date: Date | null) {
  if (!date) return "—";
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
  }).format(date);
}

export function formatSalary(
  min: number | null,
  max: number | null,
  currency: string | null,
) {
  if (!min && !max) return "Not specified";

  const cur = currency ?? "";
  if (min && max)
    return `${min.toLocaleString()} - ${max.toLocaleString()} ${cur}`;
  if (min) return `From ${min.toLocaleString()} ${cur}`;
  if (max) return `Up to ${max.toLocaleString()} ${cur}`;

  return "Not specified";
}
