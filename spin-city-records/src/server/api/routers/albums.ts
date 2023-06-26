import { User, clerkClient } from "@clerk/nextjs/server";
import { userAgent } from "next/server";
import { use } from "react";
import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  privateProcedure,
} from "~/server/api/trpc";


export const albumsRouter = createTRPCRouter({
  addUser: privateProcedure.query(async ({ ctx }) => {
    try {
      const album = await ctx.prisma.album.create({
        data: { id: ctx.userId },
      })
      return album;
    } catch (e) {
      console.log(e)
    }
  })
});