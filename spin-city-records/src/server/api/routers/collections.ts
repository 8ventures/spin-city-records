import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { z } from "zod";

export const collectionRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    try {
      const collections = await ctx.prisma.collection.findMany({
        include: {
          albums: {
            include: {
              artist: true,
              listings: {
                where: { orderId: null },
              },
              Collection: true,
            },
          },
        },
      });
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
                listings: {
                  where: { orderId: null },
                },
                Collection: true,
              },
            },
          },
        });
        return collection;
      } catch (e) {
        console.log(e);
      }
    }),

  getByUserId: privateProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { userId } = input;
      try {
        const collections = await ctx.prisma.collection.findMany({
          where: {
            userId,
          },
          include: {
            albums: {
              include: {
                artist: true,
                listings: {
                  where: { orderId: null },
                },
                Collection: true,
              },
            },
          },
        });
        return collections;
      } catch (e) {
        console.log(e);
      }
    }),

  create: privateProcedure
    .input(
      z.object({
        name: z.string(),
        userId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { name, userId } = input;
      try {
        const collection = await ctx.prisma.collection.create({
          data: {
            name: name,
            userId: userId,
          },
        });
        return collection;
      } catch (e) {
        console.log(e);
      }
    }),

  addAlbum: privateProcedure
    .input(
      z.object({
        collectionId: z.string(),
        albumId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { collectionId, albumId } = input;
      try {
        const collection = await ctx.prisma.collection.update({
          where: { id: collectionId },
          data: {
            albums: {
              connect: {
                id: albumId,
              },
            },
          },
        });
        return collection;
      } catch (e) {
        console.log(e);
      }
    }),

  removeAlbum: privateProcedure
    .input(
      z.object({
        collectionId: z.string(),
        albumId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { collectionId, albumId } = input;
      try {
        const collection = await ctx.prisma.collection.update({
          where: { id: collectionId },
          data: {
            albums: {
              disconnect: {
                id: albumId,
              },
            },
          },
        });
        return collection;
      } catch (e) {
        console.log(e);
      }
    }),
});
