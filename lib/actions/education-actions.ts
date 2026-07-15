'use server';

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { education as EducationInput } from "@/generated/prisma/client";
import type { education_level } from "@/generated/prisma/enums";


// export interface EducationInput {
//   level: education_level;
//   school_name: string;
//   school_address: string;
//   year_attended: string; // ISO date string from <input>, converted below
//   year_graduated?: string;
//   course?: string;
//   description?: string;
//   personal_details_id_fk: string;
// }

export async function getEducationsByPersonalId(personalDetailsId: string) {
  return prisma.education.findMany({
    where: { personal_details_id_fk: personalDetailsId },
    orderBy: { year_attended: "desc" },
  });
}

export async function createEducation(data: EducationInput) {
  const created = await prisma.education.create({
    data: {
      ...data,
      year_attended: new Date(data.year_attended),
      year_graduated: data.year_graduated ? new Date(data.year_graduated) : undefined,
    },
  });
  revalidatePath("/admin");
  return created;
}

export async function updateEducation(id: string, data: EducationInput) {
  const updated = await prisma.education.update({
    where: { id },
    data: {
      ...data,
      year_attended: new Date(data.year_attended),
      year_graduated: data.year_graduated ? new Date(data.year_graduated) : undefined,
    },
  });
  revalidatePath("/admin");
  return updated;
}

export async function deleteEducation(id: string) {
  await prisma.education.delete({ where: { id } });
  revalidatePath("/admin");
}