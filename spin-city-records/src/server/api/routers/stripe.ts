import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";
import { z } from "zod";

export const stripeRouter = createTRPCRouter({
  checkoutSession: privateProcedure
    .input(
      z.object({
        listingId: z.string(),
        hasData: z.any()
      })
    )
    .query(async ({ ctx, input }) => {
      const { listingId, hasData } = input;
      console.log('Data REf =====>', hasData)
      if(hasData.current) {
        return 
      }
      console.log('Creating Session =====================')
      try {
        let listing = await ctx.prisma.listing.findUnique({
          where: {
            id: listingId,
          },
          include: {
            edition: true,
            seller: true,
            album: {
              include: {
                artist: true
              }
            },
            order: true,
          },
        });
        console.log('listing found')
        if (listing?.orderId) {
          console.log(listing.orderId)
          const removeOrder = await ctx.prisma.order.delete({
            where: {
              id: listing.orderId
            }
          })
          console.log('order removed')
          const cleanListing = await ctx.prisma.listing.update({
            where: {
              id: listingId,
            },
            data: {
              orderId: null
            },
            include: {
              edition: true,
              seller: true,
              album: {
                include: {
                  artist: true
                }
              },
              order: true
            }
          });
          listing = cleanListing
        }
        if (listing && !listing.orderId) {
          console.log('clean listing:', listing)
          console.log('Creating new order')
          const newOrder = await ctx.prisma.order.create({
            data: {
              userId: ctx.user.id,
              sellerId: listing.seller.stripeId,
              status: "Awaiting Payment",
              completed: false,
            },
          });
          console.log('new order: ', newOrder)
          const uplisting = await ctx.prisma.listing.update({
            where: {
              id: listing.id,
            },
            data: {
              order: {
                connect: {
                  id: newOrder.id,
                },
              },
            },
          });
          console.log('Updated listing: ', uplisting)
          const paymentIntent = await ctx.stripe.paymentIntents.create({
            amount: listing.price * 100,
            currency: listing.currency,
            automatic_payment_methods: {
              enabled: true,
            },
            metadata: {
              order_id: newOrder.id,
            },
            application_fee_amount: 500,
            transfer_data: {
              destination: listing.stripeId,
            },
          });
          return {
            clientSecret: paymentIntent.client_secret,
            listing,
          };
        }
      } catch (e) {
        console.log(e);
      }
    }),

  retrivePaymentIntent: privateProcedure
    .input(
      z.object({
        paymentIntentId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      try {
        const paymentIntent = await ctx.stripe.paymentIntents.retrieve(
          input.paymentIntentId
        );
        return paymentIntent;
      } catch (e) {
        console.log(e);
      }
    }),
});
