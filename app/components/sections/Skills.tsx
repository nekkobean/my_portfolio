import {
  Card,
  CardContent,
  CardImage,
  Section,
} from "@eloisallena/web_components";

export interface SkillsProps {
  skills: Array<{
    skill_category?: string;
    skill_name?: string;
    skill_description?: string | null;
    proficiency_level?: number | null;
  }>;
}
export default function Skills({ info }: { info: SkillsProps }) {
  const groupedSkills = {
    hard: info.skills.filter((skill) => skill.skill_category === "hard"),
    soft: info.skills.filter((skill) => skill.skill_category === "soft"),
  };

  const skillGroups = [
    { key: "hard", title: "Hard Skills", items: groupedSkills.hard },
    { key: "soft", title: "Soft Skills", items: groupedSkills.soft },
  ];

  return (
    <Section id="skills" title="Skills" style="bg-white text-black">
      <div data-mode="light" className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {info.skills.length ? (
          skillGroups.map((group) => (
            <Card
              key={group.key}
              style="bg-primary hover:bg-light-orange transition-transform duration-300 hover:scale-105 hover:shadow-lg"
            >
              <CardImage alt={group.title} image="/elogo.png" />
              <CardContent
                title={group.title}
                description={
                  group.items.length
                    ? group.items
                        .map(
                          (skill) =>
                            `${skill.skill_name ?? "Skill"}${skill.skill_description ? ` - ${skill.skill_description}` : ""}${skill.proficiency_level != null ? ` (Proficiency: ${skill.proficiency_level})` : ""}`,
                        )
                        .join("\n")
                    : `No ${group.title.toLowerCase()} found.`
                }
              />
            </Card>
          ))
        ) : (
          <Card style="bg-primary hover:bg-light-orange transition-transform duration-300 hover:scale-105 hover:shadow-lg">
            <CardContent
              title="No skills found"
              description="Add skill records to your Prisma database to display them here."
            />
          </Card>
        )}
      </div>
    </Section>
  );
}
