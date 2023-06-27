import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from 'zod';

export const albumsRouter = createTRPCRouter({
  getAll: publicProcedure.query( async ({ctx}) => {
    try {
      const albums = await ctx.prisma.album.findMany();
      return albums
    } catch (e) {
      console.log(e)
    }
  }),
  getById: publicProcedure
  .input(z.string())
  .query( async ({ctx, input}) => {
    try {
      const album = await ctx.prisma.album.findUnique({
        where: {
          id: input
        }
      })
      return album
    } catch (e) {
      console.log(e)
    } 
  })
});