"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown";
import { Laptop, LogOut, Moon, Palette, Sun, User } from "lucide-react";
import { type Session } from "next-auth";
import { signOut } from "next-auth/react";
import { useTheme } from "next-themes";

interface Props {
  session: Session;
}

export default function UserDropdown({ session }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="size-9 cursor-pointer overflow-hidden rounded-full">
        <span className="sr-only">Your account</span>
        {session.user.image ? (
          // eslint-disable-next-line
          <img src={session.user.image} alt="" />
        ) : (
          <div className="grid h-full w-full place-content-center bg-black/5 dark:bg-white/8">
            <User className="size-5" />
          </div>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Palette /> Theme
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <ThemeContent />
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuItem onClick={() => signOut()}>
          <LogOut /> Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function ThemeContent() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenuSubContent>
      <DropdownMenuItem onClick={() => setTheme("light")}>
        <Sun /> Light
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => setTheme("dark")}>
        <Moon /> Dark
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => setTheme("system")}>
        <Laptop /> System
      </DropdownMenuItem>
    </DropdownMenuSubContent>
  );
}
