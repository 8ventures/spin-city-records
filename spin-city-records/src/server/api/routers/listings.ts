import { User, clerkClient } from "@clerk/nextjs/server";
import { userAgent } from "next/server";
import { use } from "react";
import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
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

  // create: privateProcedure.mutation(async ({ ctx, input }) => {
  //   const user = ctx.currentUser.id;
  // })
});
