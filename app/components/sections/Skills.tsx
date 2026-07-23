// import { Card, CardContent, CardImage, Section } from "@eloisallena/web_components";

// export interface SkillItem {
//   skill_category?: string;
//   skill_name?: string;
//   skill_description?: string | null;
//   proficiency_level?: number | null;
//   skill_image?: string | null;
// }

// export interface SkillsProps {
//   skills: SkillItem[];
// }

// const CATEGORY_LABELS: Record<string, string> = {
//   hard: "Hard Skill",
//   soft: "Soft Skill",
//   core: "Core Skill",
// };

// export default function Skills({ info }: { info: SkillsProps }) {
//   return (
//     <Section
//       id="skills"
//       title="Skills"
//       style="bg-white text-black"
//       sectionTitleClassName="text-black text-2xl md:text-3xl lg:text-4xl"
//     >
//       <div data-mode="light" className="flex flex-wrap justify-center gap-6">
//         {info.skills.length ? (
//           info.skills.map((skill, index) => (
//             <Card
//               key={`${skill.skill_name ?? "skill"}-${index}`}
//               style="w-full sm:w-auto sm:min-w-[260px] sm:max-w-sm bg-primary hover:bg-light-orange transition-transform duration-300 hover:scale-105 hover:shadow-lg"
//             >
//               <CardImage
//                 alt={skill.skill_name ?? "Skill"}
//                 image={skill.skill_image || "/elogo.png"}
//               />
//               <CardContent
//                 title={skill.skill_name ?? "Skill"}
//                 description={`${
//                   skill.skill_category ? CATEGORY_LABELS[skill.skill_category] ?? skill.skill_category : ""
//                 }${skill.skill_description ? `\n${skill.skill_description}` : ""}${
//                   skill.proficiency_level != null ? `\nProficiency: ${skill.proficiency_level}/10` : ""
//                 }`}
//                 titleClassName="text-xl md:text-2xl font-bold"
//                 descriptionClassName="text-sm md:text-base whitespace-pre-line"
//               />
//             </Card>
//           ))
//         ) : (
//           <Card style="w-full sm:w-auto sm:min-w-[260px] sm:max-w-sm bg-primary hover:bg-light-orange transition-transform duration-300 hover:scale-105 hover:shadow-lg">
//             <CardContent
//               title="No skills found"
//               description="Add skill records to your Prisma database to display them here."
//               titleClassName="text-xl md:text-2xl font-bold"
//               descriptionClassName="text-sm md:text-base"
//             />
//           </Card>
//         )}
//       </div>
//     </Section>
//   );
// }
import { Card, CardContent, CardImage, Section } from "@eloisallena/web_components";

export interface SkillItem {
  skill_category?: string;
  skill_name?: string;
  skill_description?: string | null;
  proficiency_level?: number | null;
  skill_image?: string | null;
}

export interface SkillsProps {
  skills: SkillItem[];
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
    <Section
      id="skills"
      title="Skills"
      style="bg-white text-black"
      sectionTitleClassName="text-black text-2xl md:text-3xl lg:text-4xl"
    >
      <div data-mode="light" className="flex flex-wrap justify-center gap-6">
        {info.skills.length ? (
          skillGroups.map((group) => (
            <Card
              key={group.key}
              style="w-full sm:w-auto sm:min-w-[260px] sm:max-w-sm bg-primary hover:bg-light-orange transition-transform duration-300 hover:scale-105 hover:shadow-lg"
            > <CardImage
                alt={group.title}
                image={group.key === "hard" ? "/tools.png" : "/core.png"}
              />
              <div className="p-6 flex flex-col gap-4">
                <h3 className="text-xl md:text-2xl font-bold">{group.title}</h3>

                {group.items.length ? (
                  <div className="flex flex-col gap-3">
                    {group.items.map((skill, index) => (
                      <div
                        key={`${skill.skill_name ?? "skill"}-${index}`}
                        className="flex items-start gap-3"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={skill.skill_image || "/elogo.png"}
                          alt={skill.skill_name ?? "Skill"}
                          className="h-10 w-10 rounded object-cover shrink-0"
                        />
                        <div className="text-sm md:text-base">
                          <p className="font-semibold">{skill.skill_name ?? "Skill"}</p>
                          {skill.skill_description && (
                            <p className="opacity-80">{skill.skill_description}</p>
                          )}
                          {skill.proficiency_level != null && (
                            <p className="opacity-80">Proficiency: {skill.proficiency_level}/10</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm md:text-base">
                    No {group.title.toLowerCase()} found.
                  </p>
                )}
              </div>
            </Card>
          ))
        ) : (
          <Card style="w-full sm:w-auto sm:min-w-[260px] sm:max-w-sm bg-primary hover:bg-light-orange transition-transform duration-300 hover:scale-105 hover:shadow-lg">
            <CardContent
              title="No skills found"
              description="Add skill records to your Prisma database to display them here."
              titleClassName="text-xl md:text-2xl font-bold"
              descriptionClassName="text-sm md:text-base"
            />
          </Card>
        )}
      </div>
    </Section>
  );
}