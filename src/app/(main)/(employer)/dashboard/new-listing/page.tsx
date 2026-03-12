import { getServerAuthSession } from "@/server/auth";
import { NewListingForm } from "../_components/new-listing-form";
import { getAllSkills } from "@/server/queries/skills";
import { redirect } from "next/navigation";

export default async function EmployerDashboardPage() {
  const session = await getServerAuthSession();
  if (session?.user.role !== "EMPLOYER") {
    throw redirect("/");
  }

  const skills = await getAllSkills();

  return (
    <>
      <NewListingForm skills={skills} />
    </>
  );
}
