import { type RoleEnumType } from "@/server/db/schema";
import { getServerAuthSession } from "@/server/auth";
import { Button, buttonVariants } from "./ui/button";
import { Bell } from "lucide-react";
import UserDropdown from "./user-dropdown";
import ThemeToggle from "./theme-toggle";
import Link from "next/link";

export default async function Header() {
  const session = await getServerAuthSession();

  return (
    <header className="header-container sticky top-2 left-0 z-40 mb-9">
      <div className="bg-card header-container flex h-12 items-center justify-between rounded border shadow/5 dark:shadow-md/45">
        {/*LEFT SIDE  */}
        <div className="flex items-center gap-6">
          <Link href="/" className="font-bold tracking-tight uppercase">
            Listings
          </Link>
          {session?.user && <Navigation role={session.user.role} />}
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
              <ThemeToggle />
              <Link
                href="/login"
                className={buttonVariants({ size: "sm", variant: "secondary" })}
              >
                Sign in
              </Link>
            </>
          )}
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
          <Link href="/">Profile</Link>
          <Link href="/">Bookmarks</Link>
          <Link href="/">Applications</Link>
        </>
      )}

      {role === "EMPLOYER" && (
        <>
          <Link href="/dashboard">Dashboard</Link>
        </>
      )}

      {role === "ADMIN" && (
        <>
          <Link href="/">Admin</Link>
        </>
      )}
    </nav>
  );
}
