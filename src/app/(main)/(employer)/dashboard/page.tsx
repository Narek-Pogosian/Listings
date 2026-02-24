import { getServerAuthSession } from "@/server/auth";
import { buttonVariants } from "@/components/ui/button";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function EmployerDashboardPage() {
  const session = await getServerAuthSession();
  if (session?.user.role !== "EMPLOYER") {
    throw redirect("/");
  }

  return (
    <>
      <Link href="/dashboard/new-listing" className={buttonVariants()}>
        Create new job listing
      </Link>

      <div className="mt-4">TODO: Filters</div>
      <div>TODO: Listings list</div>
    </>
  );
}
