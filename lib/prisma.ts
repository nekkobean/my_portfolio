
// import "dotenv/config";
// import { PrismaMariaDb } from "@prisma/adapter-mariadb";
// import { PrismaClient } from "../generated/prisma/client";

// const globalForPrisma = globalThis as unknown as {
//   prisma: PrismaClient | undefined;
// };

// function createPrismaClient() {
//   const adapter = new PrismaMariaDb({
//     host: process.env.DATABASE_HOST,
//     user: process.env.DATABASE_USER,
//     password: process.env.DATABASE_PASSWORD,
//     database: process.env.DATABASE_NAME,
//     connectionLimit: 5,
//   });
//   return new PrismaClient({ adapter });
// }

// export const prisma = globalForPrisma.prisma ?? createPrismaClient();

// if (process.env.NODE_ENV !== "production") {
//   globalForPrisma.prisma = prisma;
// }
import "dotenv/config";

import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../generated/prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

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
  /*
   * DATABASE_* variables are used locally and on Vercel.
   *
   * MYSQL* fallbacks allow Railway CLI commands such as
   * "railway run" to use Railway's native MySQL variables.
   */
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

export const prisma =
  globalForPrisma.prisma ??
  createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}