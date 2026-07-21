'use client';

import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardImage,
  Section,
} from "@eloisallena/web_components";
import { resolveProjectImage } from "@/lib/utils/image";

export interface ProjectItem {
  project_title?: string;
  project_description?: string;
  project_type?: string | null;
  project_image?: string | null;
  role?: string | null;
  technologies_used?: string;
  project_link?: string | null;
  repository_link?: string | null;
  start_date?: string;
  end_date?: string;
}

export interface ProjectsProps {
  projects: ProjectItem[];
}
export default function Projects({ info }: { info: ProjectsProps }) {
  return (
    <Section
      id="projects"
      title="Projects"
      style="bg-gray-100 text-black"
      sectionTitleClassName="text-black text-2xl md:text-3xl lg:text-4xl"
    >
      <div data-mode="light" className="flex flex-wrap justify-center gap-6">
        {info.projects.length ? (
          info.projects.map((project, index) => (
            <Card
              key={`${project.project_title ?? "project"}-${index}`}
              style="w-full sm:w-auto sm:min-w-[260px] sm:max-w-sm bg-primary hover:bg-light-orange transition-transform duration-300 hover:scale-105 hover:shadow-lg"
            >
              <CardImage
                alt={project.project_title ?? "Project"}
                image={resolveProjectImage(project.project_image)}
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
                titleClassName="text-xl md:text-2xl font-bold"
                descriptionClassName="text-sm md:text-base"
              />
              {(project.project_link || project.repository_link) && (
                <CardFooter>
                  <div className="flex gap-4">
                    {project.project_link && (
                      <Button
                        type="button"
                        variant="primary"
                        label="Live Site"
                        onClick={() => window.open(project.project_link!, "_blank", "noopener,noreferrer")}
                      />
                    )}
                    {project.repository_link && (
                      <Button
                        type="button"
                        variant="secondary"
                        label="Repo"
                        onClick={() => window.open(project.repository_link!, "_blank", "noopener,noreferrer")}
                      />
                    )}
                  </div>
                </CardFooter>
              )}
            </Card>
          ))
        ) : (
          <Card style="w-full sm:w-auto sm:min-w-[260px] sm:max-w-sm bg-primary hover:bg-light-orange transition-transform duration-300 hover:scale-105 hover:shadow-lg">
            <CardContent
              title="No projects found"
              description="Add project records to your Prisma database to display them here."
              titleClassName="text-xl md:text-2xl font-bold"
              descriptionClassName="text-sm md:text-base"
            />
          </Card>
        )}
      </div>
    </Section>
  );
}