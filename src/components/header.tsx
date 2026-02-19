import { getServerAuthSession } from "@/server/auth";
import { Button } from "./ui/button";
import ThemeToggle from "./theme-toggle";
import Link from "next/link";

export default async function Header() {
  const session = await getServerAuthSession();

  return (
    <header className="sticky top-2 left-0 z-40 container mb-9">
      <div className="bg-card container flex h-12 items-center justify-between rounded border shadow/5 dark:shadow-md/45">
        {session ? (
          <div>{session?.user.name} signed in</div>
        ) : (
          <div className="flex items-center gap-2">
            <ThemeToggle />

            <Button
              role="link"
              nativeButton={false}
              render={<Link href="/login">Sign in</Link>}
              variant="secondary"
              size="sm"
            />
          </div>
        )}
      </div>
    </header>
  );
}
