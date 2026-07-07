import {
  Card,
  CardContent,
  CardImage,
  Section,
} from "@eloisallena/web_components";

export interface SkillsProps {
  skill_category?: string;
  skill_name?: string;
  skill_description?: string;
  proficiency_level?: string;
}
export default function Skills({ info }: { info: SkillsProps }) {
  return (
    <Section id="skills" title="Skills" style="bg-white text-black">
          <div
            data-mode="light"
            className="grid grid-cols-1 gap-6 md:grid-cols-3"
          >
            <Card style="bg-primary hover:bg-light-orange transition-transform duration-300 hover:scale-105 hover:shadow-lg">
              <CardImage alt="Elogo" image="/elogo.png" />
              <CardContent
                title={`${info.skill_category}`}
                description={`${info.skill_name} ${info.skill_description} ${info.proficiency_level}`}
              />
            
            </Card>
            <Card  style="bg-primary hover:bg-light-orange transition-transform duration-300 hover:scale-105 hover:shadow-lg">
              <CardImage alt="Elogo" image="/elogo.png" />
              <CardContent
                title="Soft Skills"
                description={`${info.skill_name} ${info.skill_description} ${info.proficiency_level}`}
              />
            </Card>
            <Card  style="bg-primary hover:bg-light-orange transition-transform duration-300 hover:scale-105 hover:shadow-lg">
              <CardImage alt="Elogo" image="/elogo.png" />
              <CardContent
                title="Languages"
                description={`${info.skill_name} ${info.skill_description} ${info.proficiency_level}`}
              />
            </Card>
          </div>
        </Section>
  );
}