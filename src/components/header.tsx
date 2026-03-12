import { type RoleEnumType } from "@/server/db/schema";
import { getServerAuthSession } from "@/server/auth";
import { Button, buttonVariants } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { Bell } from "lucide-react";
import UserDropdown from "./user-dropdown";
import ThemeToggle from "./theme-toggle";
import Link from "next/link";

export default async function Header() {
  const session = await getServerAuthSession();

  return (
    <header className="header-container fixed top-2 left-0 z-40 mb-9 w-full">
      <div className="bg-card header-container flex h-12 items-center justify-between rounded border shadow/5 dark:shadow-md/45">
        {/*LEFT SIDE  */}
        <div className="flex items-center gap-6">
          <Link href="/" className="font-bold tracking-tight uppercase">
            Listings
          </Link>
          {session && <Navigation role={session.user.role} />}
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-2">
          {session ? (
            <>
              <Button size="icon" variant="ghost" className="rounded-full">
                <Bell />
              </Button>
              <UserDropdown session={session} />
            </>
          ) : (
            <>
              <Link
                href="/login"
                className={buttonVariants({ size: "sm", variant: "secondary" })}
              >
                Sign in
              </Link>
              <ThemeToggle />
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export function HeaderFallback() {
  return (
    <header className="header-container fixed top-2 left-0 z-40 mb-9 w-full">
      <div className="bg-card header-container flex h-12 items-center justify-between rounded border shadow/5 dark:shadow-md/45">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-bold tracking-tight uppercase">
            Listings
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <div className="h-8 w-20" />
          <Skeleton className="size-8 rounded-full" />
        </div>
      </div>
    </header>
  );
}

function Navigation({ role }: { role: RoleEnumType }) {
  return (
    <nav
      aria-label="primary navigation"
      className="flex gap-4 text-sm font-semibold"
    >
      {role === "USER" && (
        <>
          <Link href="/profile">Profile</Link>
        </>
      )}

      {role === "EMPLOYER" && (
        <>
          <Link href="/dashboard">Dashboard</Link>
        </>
      )}

      {role === "ADMIN" && (
        <>
          <Link href="/admin">Admin</Link>
        </>
      )}
    </nav>
  );
}
