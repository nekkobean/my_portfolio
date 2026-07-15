'use server';

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { project as ProjectInput } from "@/generated/prisma/client";
import type { project_status } from "@/generated/prisma/enums";

// export interface ProjectInput {
//   project_title: string;
//   project_description: string;
//   project_image?: string;
//   project_type?: string;
//   role?: string;
//   technologies_used: string;
//   project_link?: string;
//   repository_link?: string;
//   start_date: string;
//   end_date?: string;
//   project_status: project_status;
//   is_ongoing: boolean;
//   personal_details_id_fk: string;
// }

export async function getProjectsByPersonalId(personalDetailsId: string) {
  return prisma.project.findMany({
    where: { personal_details_id_fk: personalDetailsId },
    orderBy: { start_date: "desc" },
  });
}

export async function createProject(data: ProjectInput) {
  const created = await prisma.project.create({
    data: {
      ...data,
      start_date: new Date(data.start_date),
      end_date: data.end_date ? new Date(data.end_date) : undefined,
    },
  });
  revalidatePath("/admin");
  return created;
}

export async function updateProject(id: string, data: ProjectInput) {
  const updated = await prisma.project.update({
    where: { id },
    data: {
      ...data,
      start_date: new Date(data.start_date),
      end_date: data.end_date ? new Date(data.end_date) : undefined,
    },
  });
  revalidatePath("/admin");
  return updated;
}

export async function deleteProject(id: string) {
  await prisma.project.delete({ where: { id } });
  revalidatePath("/admin");
}