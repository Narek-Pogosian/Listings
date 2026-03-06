import { getServerAuthSession } from "@/server/auth";
import { getListingById } from "@/server/queries/listings";
import { redirect } from "next/navigation";

export default async function EmployerListingPage({
  params,
}: PageProps<"/dashboard/listing/[id]">) {
  const session = await getServerAuthSession();
  if (!session || session.user.role !== "EMPLOYER") {
    throw redirect("/");
  }

  const { id } = await params;

  const listing = await getListingById(id);
  if (!listing || listing.employerId !== session.user.id) {
    throw redirect("/dashboard");
  }

  return <div>TODO: Employer listing page</div>;
}
