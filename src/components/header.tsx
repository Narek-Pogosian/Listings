import { type RoleEnumType } from "@/server/db/schema";
import { getServerAuthSession } from "@/server/auth";
import { Button } from "./ui/button";
import { Bell } from "lucide-react";
import UserDropdown from "./user-dropdown";
import ThemeToggle from "./theme-toggle";
import Link from "next/link";

export default async function Header() {
  const session = await getServerAuthSession();

  return (
    <header className="sticky top-2 left-0 z-40 container mb-9">
      <div className="bg-card container flex h-12 items-center justify-between rounded border shadow/5 dark:shadow-md/45">
        {/*LEFT SIDE  */}
        <div>
          {/* Maybe logo here */}
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
              <Button
                role="link"
                nativeButton={false}
                render={<Link href="/login">Sign in</Link>}
                variant="secondary"
                size="sm"
              />
            </>
          )}
        </div>
      </div>
    </header>
  );
}

function Navigation({ role }: { role: RoleEnumType }) {
  return (
    <nav className="flex gap-4 text-sm font-semibold">
      <Link href="/">Profile</Link>

      {role === "USER" && (
        <>
          <Link href="/">Bookmarks</Link>
          <Link href="/">Applications</Link>
        </>
      )}

      {role === "EMPLOYER" && (
        <>
          <Link href="/">Dashboard</Link>
          <Link href="/">Post of job</Link>
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
