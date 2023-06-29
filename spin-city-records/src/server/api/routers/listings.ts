import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  privateProcedure,
} from "~/server/api/trpc";

export const listingsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    try {
      const listings = await ctx.prisma.listing.findMany();
      return listings;
    } catch (e) {
      console.log(e);
    }
  }),

  getByAlbumId: publicProcedure
  .input(
    z.object({
      albumId: z.string(),
    })
    )
    .query(async ({ ctx, input }) => {
      const { albumId } = input;
      try {
        const listings = await ctx.prisma.listing.findMany({
          where: { albumId },
        });
        return listings;
      } catch (e) {
        console.log(e);
      }
    }),

  getByUserId: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      try {
        const listings = await ctx.prisma.listing.findMany({
          where: {
            sellerId: input,
          },
        });
        return listings;
      } catch (e) {
        console.log(e);
      }
    }),
    create: privateProcedure
      .mutation(
        async ({ctx}) => {
          const stripeId = ctx.user.privateMetadata.stripeId
            try{
              const newProduct = await ctx.stripe.products.create({
                name: 'Thriller',
                description: 'Testing testing',
                metadata: {
                  'sellerId': stripeId as string
                }
              })
              //TODO Add new product to db
              const newPrice = await ctx.stripe.prices.create({
                unit_amount: 2000,
                currency: 'gbp',
                product: newProduct.id
              })
              return {newProduct, newPrice}
            } catch (e) {
              console.log(e)
            }
        }
      )
  });

  
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
  //     const albumId = "cljfsjjhp0001uaecu3329kku";
  //     try {
  //       const listing = await ctx.prisma.listing.create({
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
  //               id: userId,
  //             },
  //           },
  //           album: {
  //             connect: {
  //               id: albumId,
  //             },
  //           },
  //         },
  //       });
  //       return listing;
        
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   }),