'use server';

import { prisma } from "@/lib/prisma";


export async function getProfileData(email: string, includeRelations: boolean = false) {
  return prisma.personal_details.findUnique({
    where: {
      email,
    },
    include: {
      education: includeRelations,
      skills: includeRelations,
      projects: includeRelations,
    },
  });
}
