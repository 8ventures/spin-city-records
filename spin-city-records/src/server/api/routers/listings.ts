import { User, clerkClient } from "@clerk/nextjs/server";
import { userAgent } from "next/server";
import { use } from "react";
import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  privateProcedure,
} from "~/server/api/trpc";

//basically what we need to save in our database - the other stuff is just for clerk (security reasons)
const filterUserForClient = (user: User) => {
  return {
    id: user.id,
    username: user.username,
    profileImageUrl: user.profileImageUrl,
  };
};
export const listingsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const listings = await ctx.prisma.listing.findMany({
      // can take selectors such as -> where: { userId: ctx.session.userId },
    });

    const users = (
      await clerkClient.users.getUserList({
        userId: listings.map((listing) => listing.userId),
      })
    ).map(filterUserForClient);
      //console.log(ctx.session?.user.id)
    console.log({ listings });
    console.log({ users });

    return listings.map((listing) => {
      //this is only to take care of typescript where user can be undefined
      const user = users.find((user) => user.id === listing.userId);
      if (!user) {
        throw new Error("User not found");
      }
      return {
        listing,
        user: {
          ...user,
          username: user.username,
        },
      };
    });
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
        albumName: z.string(),
        albumLabel: z.string(),
        albumArtwork: z.string(),
        albumYear: z.number(),
        albumDuration: z.number(),
        artistName: z.string(),
        artistBio: z.string(),
        artistPicture: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
const userId = ctx.prisma.user.findUnique({
        where: { clerkId: ctx.userId },
})
      //const userId = ctx.userId;
      console.log({ userId })
      // First, find or create the artist
      const artist = await ctx.prisma.artist.create({
        data: {
          name: input.artistName,
          bio: input.artistBio,
          artistPicture: input.artistPicture,
        },
      });

      // Then, find or create the album linked to the artist
      const album = await ctx.prisma.album.create({
        data: {
          name: input.albumName,
          label: input.albumLabel,
          artwork: input.albumArtwork,
          year: input.albumYear,
          duration: input.albumDuration,
          artist: {
            connect: { id: artist.id },
          },
        },
      });

      // Finally, create the listing linked to the album
      const listing = await ctx.prisma.listing.create({
        data: {
          userId,
          price: input.price,
          currency: input.currency,
          weight: input.weight,
          format: input.format,
          description: input.description,
          condition: input.condition,
          album: {
            connect: { id: album.id },
          },
        },
      });

      return listing;
    }),
});
