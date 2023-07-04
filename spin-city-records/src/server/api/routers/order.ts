import { BsCartX } from "react-icons/bs";
import { z } from "zod";
import {
  createTRPCRouter,
  privateProcedure,
} from "~/server/api/trpc";

export const ordersRouter = createTRPCRouter({
  createOrder: privateProcedure
    .input(
      z.object({
        userId: z.string(),
        sellerId: z.string(),
        listingId: z.string()
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const order = await ctx.prisma.order.create({
          data: {
            userId: input.userId,
            sellerId: input.sellerId,
            status: 'Awating Payment',
            completed: false,
            Listings: {
              connect: {
                id: input.listingId
              }
            }
          }
        });
        return order;
      } catch (e) {
        console.log(e);
      }
    }),
  getById: privateProcedure
    .input(
      z.object({
        id: z.string()
      })
    )
    .query( async ({ ctx, input}) => {
      const {id} = input;
      try {
        const order = await ctx.prisma.order.findUnique({
          where: {id},
          include: {
            Listings: true
          }
        })
        return order
      } catch (e) {
        console.log(e)
      }
    }),
  getSellerOrders: privateProcedure
    .query( async ({ctx}) => {
      try {
        const orders = await ctx.prisma.order.findMany({
          where: {
            sellerId: ctx.user.id
          }
        })
        return orders
      } catch (e) {
        console.log(e)
      }
    }),
  getBuyerOrders: privateProcedure
    .query( async ({ctx}) => {
      try {
        const orders = await ctx.prisma.order.findMany({
          where: {
            userId: ctx.user.id
          }
        })
        return orders
      } catch (e) {
        console.log(e)
      }
    })
})