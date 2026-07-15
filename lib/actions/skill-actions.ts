'use server';

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { skill as SkillInput } from "@/generated/prisma/client";
import type { skill_category } from "@/generated/prisma/enums";

// export interface SkillInput {
//   skill_name: string;
//   skill_category: skill_category;
//   skill_description?: string;
//   proficiency_level?: number;
//   personal_details_id_fk: string;
// }

export async function getSkillsByPersonalId(personalDetailsId: string) {
  return prisma.skill.findMany({
    where: { personal_details_id_fk: personalDetailsId },
    orderBy: { skill_name: "asc" },
  });
}

export async function createSkill(data: SkillInput) {
  const created = await prisma.skill.create({ data });
  revalidatePath("/admin");
  return created;
}

export async function updateSkill(id: string, data: SkillInput) {
  const updated = await prisma.skill.update({
    where: { id },
    data,
  });
  revalidatePath("/admin");
  return updated;
}

export async function deleteSkill(id: string) {
  await prisma.skill.delete({ where: { id } });
  revalidatePath("/admin");
}