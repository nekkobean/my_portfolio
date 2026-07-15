import {
  Card,
  CardContent,
  CardImage,
  Section,
} from "@eloisallena/web_components";

export interface ProjectItem {
  project_title?: string;
  project_description?: string;
  project_type?: string | null;
  role?: string | null;
  technologies_used?: string;
  start_date?: string;
  end_date?: string;
}

export interface ProjectsProps {
  projects: ProjectItem[];
}
export default function Projects({ info }: { info: ProjectsProps }) {
  return (
    <Section id="projects" title="Projects" style="bg-gray-100 text-black">
      <div data-mode="light" className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {info.projects.length ? (
          info.projects.map((project, index) => (
            <Card
              key={`${project.project_title ?? "project"}-${index}`}
              style="bg-primary hover:bg-light-orange transition-transform duration-300 hover:scale-105 hover:shadow-lg"
            >
              <CardImage
                alt={project.project_title ?? "Project"}
                image="/elogo.png"
              />
              <CardContent
                title={project.project_title}
                description={`Role: ${project.role ?? "N/A"}

Description

${project.project_description}

Technologies

${project.technologies_used}

Start Date: ${project.start_date ?? "N/A"}
End Date: ${project.end_date ?? "Present"}`}
              />
            </Card>
          ))
        ) : (
          <Card style="bg-primary hover:bg-light-orange transition-transform duration-300 hover:scale-105 hover:shadow-lg">
            <CardContent
              title="No projects found"
              description="Add project records to your Prisma database to display them here."
            />
          </Card>
        )}
      </div>
    </Section>
  );
}
