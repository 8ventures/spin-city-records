import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  privateProcedure,
} from "~/server/api/trpc";

export const listingsRouter = createTRPCRouter({
  // getAll: publicProcedure
  //   .query(async ({ ctx }) => {
  //     try {
  //       const listings = await ctx.prisma.listing.findMany()
  //       return listings
  //     } catch (e) {
  //       console.log(e)
  //     }   
  //   }),

  // create: privateProcedure
  //   .input(
  //     z.object({
  //       price: z.number(),
  //       currency: z.string(),
  //       weight: z.string(),
  //       format: z.string(),
  //       description: z.string(),
  //       condition: z.string(),
  //       edition: z.string(),
  //     })
  //   )
  //   .mutation(async ({ ctx, input }) => {
  //     const userId = ctx.user.id;
  //     const albumId = "cljeh2c3k0004uasgpnlhofu7";
  //     try {
  //       const listing= await ctx.prisma.listing.create({
  //         data: {
  //           price: input.price,
  //           currency: input.currency,
  //           weight: input.weight,
  //           format: input.format,
  //           description: input.description,
  //           condition: input.condition,
  //           special: input.edition,
  //           user: {
  //             connect: {
  //               id: userId
  //             }
  //           },
  //           album: {
  //             connect: {
  //               id: albumId
  //             }
  //           }

  //         }
  //       });
  //       return listing;
  //     } catch (e) {
  //       console.log(e)
  //     }
  //   }),

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
  // getByUserId: publicProcedure
  //   .input(
  //     z.string()
  //   )
  //   .query( async ({ctx, input}) => {
  //     try {
  //       const listings = await ctx.prisma.listing.findMany({
  //         where: {
  //           userId: input
  //         }
  //       })
  //       return listings;
  //     } catch (e) {
  //       console.log(e)
  //     }
  //   })
});


        

