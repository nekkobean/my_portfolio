import { prisma } from "@/lib/prisma";

async function getPersonalDetails(email: string) {
  const allPersonalDetails = await prisma.personalDetails.findUnique({
    where: {
      email: email,
    },
    include: {
      education: true,
      skills: true,
      projects: true,
    },
  });
  console.log("All users:", JSON.stringify(allPersonalDetails, null, 2));
}

async function main() {
  const email = "elois.dev127@gmail.com";
  const user = await prisma.personalDetails.create({
    data: {
      firstName: "Eloisa Marie",
      middleName: "Pasion",
      lastName: "Pasion",
      languages: "English, Filipino",
      email: email,
      whatIDo: "Full-stack developer",
      introduction: "I build web apps and love solving problems.",
      socials:
        '{"socials":{"facebook":"https://www.facebook.com/", "linkedin":"https://www.linkedin.com/in/", "github":"https://www.github.com/nekkobean"}}',
      education: {
        create: [
          {
            level: "SECONDARY",
            schoolName: "General Mariano Alvarez Technical High School",
            schoolAddress: "General Mariano Alvarez, Cavite, Philippines",
            yearAttended: new Date("2016-01-01"),
            yearGraduated: new Date("2022-01-01"),
          },
          {
            level: "TERTIARY",
            schoolName: "Polytechnic University of the Philippines",
            schoolAddress: "San Pedro Laguna, Philippines",
            yearAttended: new Date("2022-01-01"),
            course: "BS Information Technology",
          },
        ],
      },
      skills: {
        create: [
          {
            skillName: "TypeScript",
            skillCategory: "HARD",
            proficiencyLevel: 3,
          },
          {
            skillName: "Communication",
            skillCategory: "SOFT",
            proficiencyLevel: 4,
          },
        ],
      },
      projects: {
        create: [
          {
            projectTitle: "Portfolio Website",
            projectDescription: "A personal portfolio built with Next.js.",
            technologiesUsed: "Next.js, Prisma, PostgreSQL",
            startDate: new Date("2026-04-21"),
            projectStatus: "ONGOING",
            isOngoing: true,
          },
          {
            projectTitle: "Web Components Library",
            projectDescription: "A personal npm package.",
            technologiesUsed: "storybook, React, TypeScript",
            startDate: new Date("2026-04-21"),
            projectStatus: "ONGOING",
            isOngoing: true,
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
  console.log("Created user:", user);

  getPersonalDetails(email);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
