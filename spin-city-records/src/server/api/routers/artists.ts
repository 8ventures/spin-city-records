import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";

export const artistsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    try {
      const artists = await ctx.prisma.artist.findMany();
      return artists;
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
        const artist = await ctx.prisma.artist.findUnique({
          where: { id },
          include: {
            albums: true,
          },
        });
        return artist;
      } catch (e) {
        console.log(e);
      }
    }),
});
