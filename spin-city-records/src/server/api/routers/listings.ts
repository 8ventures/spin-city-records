import { User, clerkClient } from "@clerk/nextjs/server";
import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  privateProcedure,
} from "~/server/api/trpc";
import { Listing } from "~/utils/types";

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
        edition: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.userId;
      console.log({ userId })
      const albumId = "cljeh2c3k0004uasgpnlhofu7";
      try {
        const listing= await ctx.prisma.listing.create({
          data: {
            price: input.price,
            currency: input.currency,
            weight: input.weight,
            format: input.format,
            description: input.description,
            condition: input.condition,
            edition: input.edition,
            user: {
              connect: {
                id: userId
              }
            },
            album: {
              connect: {
                id: albumId
              }
            }

          }
        });
        return listing;
        

export const listingsRouter = createTRPCRouter({
  getByAlbumId: publicProcedure
    .input(
      z.object({
        albumId: z.string()
      }),
    )
    .query( async ({ctx, input}) => {
      const {albumId} = input
      try {
        const listings = await ctx.prisma.listing.findMany({
          where: {albumId}
        })
        return listings
      } catch (e) {
        console.log(e)
      } 
    }),
  getByUserId: publicProcedure
    .input(z.string())
    .query( async ({ctx, input}) => {
      try {
        const listings = await ctx.prisma.listing.findMany({
          where: {
            userId: input
          }
        })
        return listings;
      } catch (e) {
        console.log(e)
      }
    })
});

