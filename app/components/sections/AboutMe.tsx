import { Card, CardContent, Section } from "@eloisallena/web_components";

export interface AboutMeProps {
  school_name?: string;
  school_address?: string;
  year_attended?: string;
  year_graduated?: string | null;
  course?: string | null;
}

export default function AboutMe({ info }: { info: AboutMeProps }) {
  return (
    <Section id="about-me" title="About Me" style="bg-white text-black">
      <div data-mode="light" className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card style="bg-primary hover:bg-light-orange transition-transform duration-300 hover:scale-105 hover:shadow-lg">
          <CardContent
            title="Education"
            description={`${info.school_name} ${info.school_address} ${info.year_attended} - ${info.year_graduated} ${info.course}`}
          />
        </Card>
        <Card style="bg-primary hover:bg-light-orange transition-transform duration-300 hover:scale-105 hover:shadow-lg">
          <CardContent
            title="What I Do"
            description="I have experience working with Next.js, Vite, Storybook, and TypeScript while also applying Agile, Scrum, Quality Assurance, and UI/UX design principles in academic and collaborative projects. I enjoy turning ideas into functional and visually appealing solutions while continuously learning new technologies."
          />
        </Card>
        <Card style="bg-primary hover:bg-light-orange transition-transform duration-300 hover:scale-105 hover:shadow-lg">
          <CardContent
            title="Interests"
            description={`Product Design
            Software Testing
            Project Leadership
            Technology Innovation`}
          />
        </Card>
      </div>
    </Section>
  );
}
