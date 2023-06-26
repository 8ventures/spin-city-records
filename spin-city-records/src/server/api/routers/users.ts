import { User, clerkClient } from "@clerk/nextjs/server";
import { userAgent } from "next/server";
import { use } from "react";
import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  privateProcedure,
} from "~/server/api/trpc";


export const usersRouter = createTRPCRouter({
  addUser: privateProcedure.query(async ({ ctx }) => {
    try {
      const user = await ctx.prisma.user.create({
        data: { id: ctx.userId },
      })
      return user
    } catch (e) {
      console.log(e)
    }
  }),
});


