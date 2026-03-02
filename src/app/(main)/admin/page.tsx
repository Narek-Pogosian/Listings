import { getServerAuthSession } from "@/server/auth";
import { getAllSkills } from "@/server/queries/skills";
import { redirect } from "next/navigation";
import AddSkillForm from "./_components/add-skill-form";

export default async function AdminPage() {
  const session = await getServerAuthSession();
  if (!session || session.user.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <div>
      <section className="bg-card space-y-6 rounded border p-6 shadow/5 dark:shadow-md/45">
        <h2 className="font-bold">Manage skills</h2>

        <div>
          <h3 className="mb-2 text-sm font-medium">Available skills</h3>
          <Skills />
        </div>

        <div>
          <h3 className="mb-2 text-sm font-medium">Add a skill</h3>
          <AddSkillForm />
        </div>
      </section>
    </div>
  );
}

async function Skills() {
  const skills = await getAllSkills();

  if (skills.length === 0) {
    return (
      <div className="text-muted-foreground text-sm">No skills available</div>
    );
  }

  return (
    <ul className="flex gap-2">
      {skills.map((skill) => (
        <li className="bg-muted rounded px-3 py-0.75 text-sm" key={skill.id}>
          {skill.name}
        </li>
      ))}
    </ul>
  );
}
