"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";

export default function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  function toggleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  return (
    <Button
      size="icon"
      className="size-8!"
      variant="ghost"
      onClick={toggleTheme}
    >
      <Sun className="hidden size-5 dark:block" />
      <Moon className="block size-5 dark:hidden" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
