import { getServerAuthSession } from "@/server/auth";
import { getAllSkills, getUserSkills } from "@/server/queries/skills";
import { getUserInfo } from "@/server/queries/user";
import { redirect } from "next/navigation";
import BioForm from "../_components/bio-form";
import SkillsManager from "../_components/skills-manager";

export default async function UserProfilePage() {
  const session = await getServerAuthSession();
  if (!session || session.user.role !== "USER") redirect("/");

  const [skills, userSkills, info] = await Promise.all([
    getAllSkills(),
    getUserSkills(session.user.id),
    getUserInfo(session.user.id),
  ]);

  return (
    <div className="space-y-6">
      <section className="bg-card rounded border p-6 shadow/5 dark:shadow-md/45">
        <div>
          <h1 className="text-lg font-semibold">Your profile</h1>
        </div>
      </section>

      <section className="bg-card rounded border p-6 shadow/5 dark:shadow-md/45">
        <h2 className="mb-4 font-semibold">Bio</h2>
        <BioForm initialBio={info.bio} />
      </section>

      <section className="bg-card rounded border p-6 shadow/5 dark:shadow-md/45">
        <h2 className="mb-4 font-semibold">Skills</h2>
        <SkillsManager availableSkills={skills} initialSkills={userSkills} />
      </section>
    </div>
  );
}
