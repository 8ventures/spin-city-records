import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
export const editionsRouter = createTRPCRouter({
  getAll: publicProcedure
    .query(async ({ ctx }) => {
      try {
        const editions = await ctx.prisma.edition.findMany();
        return editions;
      } catch (e) {
        console.error(e);
      }
    }),
});