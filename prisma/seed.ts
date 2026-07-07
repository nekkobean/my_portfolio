import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient, Prisma } from "@/generated/prisma/client";
const adapter = new PrismaMariaDb({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  connectionLimit: 5,
});

const prisma = new PrismaClient({ adapter });;

async function getPersonalDetails(email: string) {
  const all_personal_details = await prisma.personal_details.findUnique({
    where: {
      email: email,
    },
    include: {
      education: true,
      skills: true,
      projects: true,
    },
  });
  console.log("All users:", JSON.stringify(all_personal_details, null, 2));
}

async function main() {
  const email = "elois.dev127@gmail.com";

  const user = await prisma.personal_details.create({
    data: {
      first_name: "Eloisa Marie",
      middle_name: "Pasion",
      last_name: "Pasion",
      languages: "English, Filipino",
      email: email,
      what_i_do: "Full-stack developer",
      introduction: "I build web apps and love solving problems.",
      socials: {
        facebook: "https://www.facebook.com/",
        linkedin: "https://www.linkedin.com/in/",
        github: "https://www.github.com/nekkobean",
      },
      education: {
        create: [
          {
            level: "secondary",
            school_name: "General Mariano Alvarez Technical High School",
            school_address: "General Mariano Alvarez, Cavite, Philippines",
            year_attended: new Date("2016-01-01"),
            year_graduated: new Date("2022-01-01"),
          },
          {
            level: "tertiary",
            school_name: "Polytechnic University of the Philippines",
            school_address: "San Pedro Laguna, Philippines",
            year_attended: new Date("2022-01-01"),
            course: "BS Information Technology",
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
            project_title: "Portfolio Website",
            project_description: "A personal portfolio built with Next.js.",
            technologies_used: "Next.js, Prisma, PostgreSQL",
            start_date: new Date("2026-04-21"),
            project_status: "ongoing",
            is_ongoing: true,
          },
          {
            project_title: "Web Components Library",
            project_description: "A personal npm package.",
            technologies_used: "storybook, React, TypeScript",
            start_date: new Date("2026-04-21"),
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
