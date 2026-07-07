import { Card, CardContent, CardImage, Section } from "@eloisallena/web_components";

export interface ProjectsProps {
  project_title?: string;
  project_description?: string;
  project_type?: string;
  role?: string;
  technologies_used?: string;
  start_date?: string;
  end_date?: string;

}
export default function Projects({ info }: { info: ProjectsProps }) {
  return (
    <Section id="projects" title="Projects" style="bg-gray-100 text-black">
              <div
                data-mode="light"
                className="grid grid-cols-1 gap-6 md:grid-cols-3"
              >
                <Card style="bg-primary hover:bg-light-orange transition-transform duration-300 hover:scale-105 hover:shadow-lg">
                  <CardImage alt="Elogo" image="/elogo.png" />
                  <CardContent
                    title={info.project_title}
                    description={`Role: ${info.role}
    
                    Description
    
                    ${info.project_description}
                    Technologies
    
                    ${info.technologies_used}
                    Start Date: ${info.start_date}
                    End Date: ${info.end_date}`}
                  />
                </Card>
                <Card style="bg-primary hover:bg-light-orange transition-transform duration-300 hover:scale-105 hover:shadow-lg">
                  <CardImage alt="Elogo" image="/elogo.png" />
                  <CardContent
                    title="DiversiTea POS System"
                    description={`Role: Project Manager & QA Tester
    
                    Description
    
                    A Point-of-Sale system developed for a café to streamline order processing and inventory management.
    
                    Contributions
    
                    Led a team of 6 members
                    Managed tasks and project progress
                    Conducted QA testing
                    Assisted in UI/UX design
    
                    Technologies
    
                    Canva
                    Jira
                    HTML/CSS`}
                  />
                </Card>
    
                <Card style="bg-primary hover:bg-light-orange transition-transform duration-300 hover:scale-105 hover:shadow-lg">
                  <CardImage alt="Elogo" image="/elogo.png" />
                  <CardContent
                    title="Web Components Library"
                    description={`Role: Frontend Developer
    
                    Description
    
                    A reusable React component library for building modern and responsive web interfaces.
    
                    Contributions
    
                    Developed reusable UI components.
                    Configured npm package distribution.
                    Documented components with Storybook.
                    Integrated the library with Next.js.
    
                    Technologies
    
                    React
                    TypeScript
                    Next.js
                    Vite
                    Storybook
                    npm
                    Tailwind CSS `}
                  />
                </Card>
              </div>
            </Section>
    );
}