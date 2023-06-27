import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const albumsRouter = createTRPCRouter({
  getAll: publicProcedure.query( ({ctx}) => {
    try {
      const albums = ctx.prisma.album.findMany();
      return albums
    } catch (e) {
      console.log(e)
    }
  })
});