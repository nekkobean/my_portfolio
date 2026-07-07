"use server";

import { prisma } from "@/lib/prisma";

export async function getProfileData(email: string) {
  return prisma.personal_details.findUnique({
    where: {
      email,
    },
    include: {
      education: true,
      skills: true,
      projects: true,
    },
  });
}
