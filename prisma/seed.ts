// import "dotenv/config";
// import { PrismaMariaDb } from "@prisma/adapter-mariadb";
// import { PrismaClient, Prisma } from "@/generated/prisma/client";
// const adapter = new PrismaMariaDb({
//   host: process.env.DATABASE_HOST,
//   user: process.env.DATABASE_USER,
//   password: process.env.DATABASE_PASSWORD,
//   database: process.env.DATABASE_NAME,
//   connectionLimit: 5,
// });

// const prisma = new PrismaClient({ adapter });;

// async function getPersonalDetails(email: string) {
//   const all_personal_details = await prisma.personal_details.findUnique({
//     where: {
//       email: email,
//     },
//     include: {
//       education: true,
//       skills: true,
//       projects: true,
//     },
//   });
//   console.log("All users:", JSON.stringify(all_personal_details, null, 2));
// }

// async function main() {
//   const email = "elois.dev127@gmail.com";

//   const user = await prisma.personal_details.create({
//     data: {
//       first_name: "Eloisa Marie",
//       middle_name: "Pasion",
//       last_name: "Pasion",
//       languages: "English, Filipino",
//       email: email,
//       what_i_do: "Full-stack developer",
//       introduction: "I build web apps and love solving problems.",
//       socials: {
//         facebook: "https://www.facebook.com/",
//         linkedin: "https://www.linkedin.com/in/",
//         github: "https://www.github.com/nekkobean",
//       },
//       education: {
//         create: [
//           {
//             level: "secondary",
//             school_name: "General Mariano Alvarez Technical High School",
//             school_address: "General Mariano Alvarez, Cavite, Philippines",
//             year_attended: new Date("2016-01-01"),
//             year_graduated: new Date("2022-01-01"),
//           },
//           {
//             level: "tertiary",
//             school_name: "Polytechnic University of the Philippines",
//             school_address: "San Pedro Laguna, Philippines",
//             year_attended: new Date("2022-01-01"),
//             course: "BS Information Technology",
//           },
//         ],
//       },
//       skills: {
//         create: [
//           {
//             skill_name: "TypeScript",
//             skill_category: "hard",
//             proficiency_level: 3,
//           },
//           {
//             skill_name: "Communication",
//             skill_category: "soft",
//             proficiency_level: 4,
//           },
//         ],
//       },
//       projects: {
//         create: [
//           {
//             project_title: "Portfolio Website",
//             project_description: "A personal portfolio built with Next.js.",
//             technologies_used: "Next.js, Prisma, PostgreSQL",
//             start_date: new Date("2026-04-21"),
//             project_status: "ongoing",
//             is_ongoing: true,
//           },
//           {
//             project_title: "Web Components Library",
//             project_description: "A personal npm package.",
//             technologies_used: "storybook, React, TypeScript",
//             start_date: new Date("2026-04-21"),
//             project_status: "ongoing",
//             is_ongoing: true,
//           },
//         ],
//       },
//     },
//     include: {
//       education: true,
//       skills: true,
//       projects: true,
//     },
//   });

//   console.log("Created user:", user);
//   getPersonalDetails(email);
// }

// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });
import "dotenv/config";

import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../generated/prisma/client";

function getRequiredEnvironmentVariable(
  name: string,
  value: string | undefined,
): string {
  const normalizedValue = value?.trim();

  if (!normalizedValue) {
    throw new Error(
      `Missing required environment variable: ${name}`,
    );
  }

  return normalizedValue;
}

function createPrismaClient(): PrismaClient {
  const host = getRequiredEnvironmentVariable(
    "DATABASE_HOST or MYSQLHOST",
    process.env.DATABASE_HOST ??
      process.env.MYSQLHOST,
  );

  const user = getRequiredEnvironmentVariable(
    "DATABASE_USER or MYSQLUSER",
    process.env.DATABASE_USER ??
      process.env.MYSQLUSER,
  );

  const password = getRequiredEnvironmentVariable(
    "DATABASE_PASSWORD or MYSQLPASSWORD",
    process.env.DATABASE_PASSWORD ??
      process.env.MYSQLPASSWORD,
  );

  const database = getRequiredEnvironmentVariable(
    "DATABASE_NAME or MYSQLDATABASE",
    process.env.DATABASE_NAME ??
      process.env.MYSQLDATABASE,
  );

  const portText =
    process.env.DATABASE_PORT ??
    process.env.MYSQLPORT ??
    "3306";

  const port = Number(portText);

  if (
    !Number.isInteger(port) ||
    port <= 0 ||
    port > 65535
  ) {
    throw new Error(
      "DATABASE_PORT or MYSQLPORT must be a valid port number.",
    );
  }

  const adapter = new PrismaMariaDb({
    host,
    port,
    user,
    password,
    database,
    connectionLimit: 5,
  });

  return new PrismaClient({
    adapter,
  });
}

const prisma = createPrismaClient();

async function getPersonalDetails(
  email: string,
): Promise<void> {
  const personalDetails =
    await prisma.personal_details.findUnique({
      where: {
        email,
      },

      include: {
        education: true,
        skills: true,
        projects: true,
      },
    });

  console.log(
    "Personal details:",
    JSON.stringify(
      personalDetails,
      null,
      2,
    ),
  );
}

async function main(): Promise<void> {
  const email = "elois.dev@gmail.com";

  const existingProfile =
    await prisma.personal_details.findUnique({
      where: {
        email,
      },

      select: {
        id: true,
        email: true,
      },
    });

  if (existingProfile) {
    console.log(
      `Seed skipped: a profile already exists for ${existingProfile.email}.`,
    );

    await getPersonalDetails(email);
    return;
  }

  const user =
    await prisma.personal_details.create({
      data: {
        first_name: "Eloisa Marie",
        middle_name: "Pasion",
        last_name: "Llena",
        languages: "English, Filipino",
        email,
        what_i_do: "Full-stack developer",
        introduction:
          "I build web apps and love solving problems.",

        socials: {
          facebook:
            "https://www.facebook.com/",
          linkedin:
            "https://www.linkedin.com/in/",
          github:
            "https://www.github.com/nekkobean",
        },

        education: {
          create: [
            {
              level: "secondary",
              school_name:
                "General Mariano Alvarez Technical High School",
              school_address:
                "General Mariano Alvarez, Cavite, Philippines",
              year_attended:
                new Date("2016-01-01"),
              year_graduated:
                new Date("2022-01-01"),
            },
            {
              level: "tertiary",
              school_name:
                "Polytechnic University of the Philippines",
              school_address:
                "San Pedro, Laguna, Philippines",
              year_attended:
                new Date("2022-01-01"),
              course:
                "BS Information Technology",
            },
          ],
        },

        skills: {
          create: [
            {
              skill_name: "TypeScript",
              skill_category: "hard",
              proficiency_level: 3,
            },
            {
              skill_name: "Communication",
              skill_category: "soft",
              proficiency_level: 4,
            },
          ],
        },

        projects: {
          create: [
            {
              project_title:
                "Portfolio Website",
              project_description:
                "A personal portfolio built with Next.js.",
              technologies_used:
                "Next.js, Prisma, MySQL",
              start_date:
                new Date("2026-04-21"),
              project_status: "ongoing",
              is_ongoing: true,
            },
            {
              project_title:
                "Web Components Library",
              project_description:
                "A personal npm package.",
              technologies_used:
                "Storybook, React, TypeScript",
              start_date:
                new Date("2026-04-21"),
              project_status: "ongoing",
              is_ongoing: true,
            },
          ],
        },
      },

      include: {
        education: true,
        skills: true,
        projects: true,
      },
    });

  console.log(
    "Created profile:",
    JSON.stringify(user, null, 2),
  );

  await getPersonalDetails(email);
}

main()
  .catch((error: unknown) => {
    console.error(
      "Database seeding failed:",
      error,
    );

    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });