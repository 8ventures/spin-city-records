import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";

export const albumsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    try {
      const albums = await ctx.prisma.album.findMany();
      return albums;
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
        const album = await ctx.prisma.album.findUnique({
          where: { id },
          include: {
            artist: true,
          },
        });
        return album;
      } catch (e) {
        console.log("here");
        console.log(e);
      }
    }),
});
