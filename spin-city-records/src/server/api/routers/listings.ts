import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  privateProcedure,
} from "~/server/api/trpc";
import { api } from "~/utils/api";

export const listingsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    try {
      const listings = await ctx.prisma.listing.findMany();
      return listings;
    } catch (e) {
      console.log(e);
    }
  }),

  createListing: privateProcedure
    .input(
      z.object({
        price: z.number(),
        currency: z.string(),
        weight: z.string(),
        format: z.string(),
        description: z.string(),
        condition: z.string(),
        speed: z.string(),
        album: z.object({
          artistId: z.string(),
          artwork: z.string(),
          createdAt: z.date(),
          id: z.string(),
          label: z.string(),
          name: z.string(),
          updatedAt: z.date(),
          year: z.number()
        }),
        editions: z.array(z.object({ value: z.string() })),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const editionArray = input.editions.map<{id: number}>((form) => ({id: Number(form.value)}))
      const stripeId = ctx.user.privateMetadata.stripeId as string
      console.log(input)
      try{
        const newProduct = await ctx.stripe.products.create({
          name: input.album.name,
          description: input.description,
          images: [input.album.artwork],
          metadata: {
            'sellerId': stripeId,
          }
        })
        const newPrice = await ctx.stripe.prices.create({
          unit_amount: input.price * 100,
          currency: input.currency.toLowerCase(),
          product: newProduct.id
        })
        const listing = await ctx.prisma.listing.create({
          data: {
            price: input.price,
            currency: input.currency,
            weight: input.weight,
            format: input.format,
            description: input.description,
            condition: input.condition,
            speed: input.speed,
            stripePrice: newPrice.id,
            stripeProduct: newProduct.id,
            seller: {
              connect: {
                stripeId: stripeId,
              },
            },
            edition: {
              connect: editionArray
            },
            album: {
              connect: {
                id: input.album.id,
              },
            },
          },
        });
      return listing;
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
          include: {
            edition: true,
            seller: true,
          },
        });
        return listings;
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
        const listing = await ctx.prisma.listing.findUnique({
          where: { id },
          include: {
            edition: true,
            seller: true,
          },
        });
        return listing;
      } catch (e) {
        console.log(e);
      }
    }),

  getByUserId: privateProcedure

    .query(async ({ ctx }) => {
      try {
        const listings = await ctx.prisma.listing.findMany({
          where: {
            stripeId: ctx.user?.privateMetadata.stripeId as string,
          },
        });
        return listings;
      } catch (e) {
        console.log(e);
      }
    }),
});

//   createListingStripe: privateProcedure.mutation(async ({ ctx }) => {
//     const stripeId = ctx.user.privateMetadata.stripeId;
//     try {
//       const newProduct = await ctx.stripe.products.create({
//         name: "Thriller",
//         description: "Testing testing",
//         metadata: {
//           sellerId: stripeId as string,
//         },
//       });
//       //TODO Add new product to db
//       const newPrice = await ctx.stripe.prices.create({
//         unit_amount: 2000,
//         currency: "gbp",
//         product: newProduct.id,
//       });
//       return { newProduct, newPrice };
//     } catch (e) {
//       console.log(e);
//     }
//   }),
// });

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
