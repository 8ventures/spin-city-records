import { PrismaClient } from "@prisma/client";
import { env } from "~/env.mjs";
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient<PrismaClient>({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });
if (env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
// // import { PrismaClient } from '@prisma/client';

// let prisma;

// if (process.env.NODE_ENV === 'production') {
//   prisma = new PrismaClient();
// } else {
//   if (!global.prisma) {
//     global.prisma = new PrismaClient();
//   }
//   prisma = global.prisma;
// }

// export default prisma;