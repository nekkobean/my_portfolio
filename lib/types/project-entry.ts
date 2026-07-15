import type { project_status } from "@/generated/prisma/enums";

export interface ProjectInput {
  project_title: string;
  project_description: string;
  project_image?: string;
  project_type?: string;
  role?: string;
  technologies_used: string;
  project_link?: string;
  repository_link?: string;
  start_date: string;
  end_date?: string;
  project_status: project_status;
  is_ongoing: boolean;
  personal_details_id_fk: string;
}
