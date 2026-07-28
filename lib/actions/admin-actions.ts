// 'use server';

// import { prisma } from "@/lib/prisma";
// import { revalidatePath } from "next/cache";
// // import PersonalDetails from "../types/personal-details";
// import { personal_details as PersonalDetails } from "@/generated/prisma/client";

// export type PersonalDetailsInput = Omit<PersonalDetails, "socials">;

// export async function getPersonalDetails( email: string) {
//  console.log  (prisma.personal_details.findFirst({
//     where: { email }
//   })
// )
//   return prisma.personal_details.findFirst({
//     where: { email }
//   });
// }

// export async function createPersonalDetails(data: PersonalDetailsInput) {
//   const created = await prisma.personal_details.create({ data });
//   revalidatePath("/admin");
//   return created;
// }

// export async function updatePersonalDetails(id: string, data: PersonalDetailsInput) {
//   const updated = await prisma.personal_details.update({
//     where: { id },
//     data,
//   });
//   revalidatePath("/admin");
//   return updated;
// }

// export async function deletePersonalDetails(id: string) {
//   await prisma.personal_details.delete({ where: { id } });
//   revalidatePath("/admin");
// }
"use server";

import { revalidatePath } from "next/cache";

import type { personal_details as PersonalDetails } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";

export type PersonalDetailsInput = Omit<
  PersonalDetails,
  "socials"
>;

export async function getPersonalDetails(
  email: string,
) {
  return prisma.personal_details.findUnique({
    where: {
      email,
    },
  });
}

export async function createPersonalDetails(
  data: PersonalDetailsInput,
) {
  const created =
    await prisma.personal_details.create({
      data,
    });

  revalidatePath("/");

  return created;
}

export async function updatePersonalDetails(
  id: string,
  data: PersonalDetailsInput,
) {
  const updated =
    await prisma.personal_details.update({
      where: {
        id,
      },
      data,
    });

  revalidatePath("/");

  return updated;
}

export async function deletePersonalDetails(
  id: string,
) {
  const deleted =
    await prisma.personal_details.delete({
      where: {
        id,
      },
    });

  revalidatePath("/");

  return deleted;
}