import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  privateProcedure,
} from "~/server/api/trpc";

export const listingsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    try {
      const listings = await ctx.prisma.listing.findMany({
        where: {
          orderId: null,
        },
      });
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
          year: z.number(),
        }),
        editions: z.array(z.object({ value: z.string() })),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const editionArray = input.editions.map<{ id: number }>((form) => ({
        id: Number(form.value),
      }));
      const stripeId = ctx.user.privateMetadata.stripeId as string;
      try {
        const newProduct = await ctx.stripe.products.create({
          name: input.album.name,
          description: input.description,
          images: [input.album.artwork],
          metadata: {
            sellerId: stripeId,
          },
        });
        const newPrice = await ctx.stripe.prices.create({
          unit_amount: input.price * 100,
          currency: input.currency.toLowerCase(),
          product: newProduct.id,
        });
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
              connect: editionArray,
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
          where: { albumId: albumId, orderId: null },
          include: {
            edition: true,
            seller: true,
            album: {
              include: {
                artist: true,
              },
            },
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
      try {
        const { id } = input;
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
    .input(z.object({ stripeId: z.string().optional() }))
    .query(async ({ ctx, input }) => {
      const stripeId = input?.stripeId ?? ctx.user?.privateMetadata.stripeId;
      try {
        const listings = await ctx.prisma.listing.findMany({
          where: {
            stripeId: stripeId as string,
          },
        });
        return listings;
      } catch (e) {
        console.log(e);
      }
    }),

  deleteListing: privateProcedure
    .input(z.object({ listingId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.listing.delete({
          where: {
            id: input.listingId,
          },
        });
        return true;
      } catch (e) {
        console.log(e);
        console.log("Failed to delete the listing");
        return false;
      }
    }),
});
