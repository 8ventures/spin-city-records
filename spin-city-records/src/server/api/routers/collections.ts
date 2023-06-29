import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";

export const collectionRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    try {
      const collections = await ctx.prisma.collection.findMany();
      return collections;
    } catch (e) {
      console.log(e);
    }
  }),
  getById: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { id } = input;
      try {
        const collection = await ctx.prisma.collection.findUnique({
          where: { id },
          include: {
            albums: {
              include: {
                artist: true,
                listings: true,
                Collection: true,
              },
            },
          },
        });
        return collection?.albums;
      } catch (e) {
        console.log("here");
        console.log(e);
      }
    }),
});
