import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";
import { z } from "zod";

export const stripeRouter = createTRPCRouter({
  checkoutSession: privateProcedure
    .input(
      z.object({
        id: z.string(),
        price: z.string(),
        currency: z.string(),
        stripeProduct: z.string(),
        stripePrice: z.string(),
        stripeId: z.string()
      })
    )
    .mutation(
      async ({ ctx, input }) => {
        try {
          const session = await ctx.stripe.checkout.sessions.create({
            line_items: [
              {
                price: input.stripePrice,
                quantity: 1,
              },
            ],
            payment_intent_data: {
              application_fee_amount: 500,
              transfer_data: {
                destination: input.stripeId
              }
            },
            mode: 'payment',
            success_url: 'http://localhost:3000/PaymentSuccess',
            cancel_url: 'http://localhost:3000/fail',
            automatic_tax: {enabled: true},
          });
          console.log(session)
          return session.url
        } catch (e) {
          console.log(e)
        }
      }
    )
})
