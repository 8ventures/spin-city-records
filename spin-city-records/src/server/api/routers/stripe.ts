import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";
import { z } from "zod";

const checkoutInput = z.object({
  id: z.string(),
  price: z.number(),
  currency: z.string(),
  stripeProduct: z.string(),
  stripePrice: z.string(),
  stripeId: z.string()
})

type CheckoutInput = z.infer<typeof checkoutInput>;

const calcOrderAmount = (items: CheckoutInput[] ) => {
  return items.reduce((total, item) => total + item.price,0 ) * 100
}
export const stripeRouter = createTRPCRouter({
  checkoutSession: privateProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(
      async ({ ctx, input }) => {
        const { id } = input
        try {
          const listing = await ctx.prisma.listing.findUnique({
            where: { id },
            include: {
              edition: true,
              seller: true,
              album: true
            },
          });
          if(listing) {
            const paymentIntent = await ctx.stripe.paymentIntents.create({
              amount: listing.price * 100,
              currency: listing.currency,
              automatic_payment_methods: {
                enabled: true,
              },
              application_fee_amount: 500,
              transfer_data: {
                destination: listing.stripeId
              }
            })
            return { 
              clientSecret: paymentIntent.client_secret,
              listing
            }
          }
        } catch (e) {
          console.log(e)
        }
      }
    )
})
