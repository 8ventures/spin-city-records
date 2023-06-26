import { User, clerkClient } from "@clerk/nextjs/server";
import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  privateProcedure,
} from "~/server/api/trpc";

export const listingsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    try {
      const listings = await ctx.prisma.listing.findMany()
      return listings
    } catch (e) {
      console.log(e)
    }
  }),

  create: privateProcedure
    .input(
      z.object({
        price: z.number(),
        currency: z.string(),
        weight: z.string(),
        format: z.string(),
        description: z.string(),
        condition: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.userId;
      try {
        const listing = await ctx.prisma.listing.create({
          data: {
            ...input,
            user: {
              connect: {
                id: userId
              }
            }
          }
        });
        return listing;
      } catch (e) {
        console.log(e)
      }
    })
});
