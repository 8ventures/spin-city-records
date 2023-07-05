import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";
import { z } from "zod";

export const stripeRouter = createTRPCRouter({
  checkoutSession: privateProcedure
    .input(
      z.object({
        listingId: z.string(),
      })
    )
    .query(
      async ({ ctx, input }) => {
        const { listingId } = input
        try {
          const listing = await ctx.prisma.listing.findUnique({
            where: { 
              id: listingId
             },
            include: {
              edition: true,
              seller: true,
              album: true
            },
          });
          if(listing && !listing.orderId) {
            const newOrder = await ctx.prisma.order.create({
              data: {
                userId: ctx.user.id ,
                sellerId: listing.seller.stripeId,
                status: 'Awating Payment',
                completed: false,
              }
            })
            const uplisting = await ctx.prisma.listing.update({
              where: {
                id: listing.id
              },
              data: {
                order: {
                  connect: {
                    id: newOrder.id
                  }
                }
              }
            })
            console.log(uplisting)
            const paymentIntent = await ctx.stripe.paymentIntents.create({
              amount: listing.price * 100,
              currency: listing.currency,
              automatic_payment_methods: {
                enabled: true,
              },
              metadata: {
                order_id: newOrder.id
              },
              application_fee_amount: 500,
              transfer_data: {
                destination: listing.stripeId
              }
            })
            return { 
              clientSecret: paymentIntent.client_secret,
              listing,
            }
          }
        } catch (e) {
          console.log(e)
        }
      }
    ),

  retrivePaymentIntent: privateProcedure
    .input(
      z.object({
      paymentIntentId: z.string()
      })
    )
    .query( async ({ctx, input}) => {
      try{
        const paymentIntent = await ctx.stripe.paymentIntents.retrieve(input.paymentIntentId);
        return paymentIntent
      } catch (e) {
        console.log(e)
      }
    })
})
