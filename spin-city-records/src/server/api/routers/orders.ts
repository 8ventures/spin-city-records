import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";

export const ordersRouter = createTRPCRouter({
  getAllOrders: publicProcedure.query(async ({ ctx }) => {
    try {
      const orders = await ctx.prisma.order.findMany();
      return orders;
    } catch (e) {
      console.log(e);
    }
  }),

  getByOrderById: publicProcedure
    .input(
      z.object({
        orderId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { orderId } = input;
      try {
        const listings = await ctx.prisma.listing.findMany({
          where: { orderId },
        });
        return listings;
      } catch (e) {
        console.log(e);
      }
    }),
});
