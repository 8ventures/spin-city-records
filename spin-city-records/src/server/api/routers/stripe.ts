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
        stripePrice: z.string()
      })
    )
    .mutation(
      async ({ ctx }) => {
        try {
          const session = await ctx.stripe.checkout.sessions.create({
            line_items: [
              {
                // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                price: 'price_1NOVBHLS7dhrxjRDDc15h5D7',
                quantity: 1,
              },
            ],
            mode: 'payment',
            success_url: 'http://localhost:3000/PaymentSuccess',
            cancel_url: 'http://localhost:3000/fail',
            automatic_tax: {enabled: true},
          });
          return session.url
        } catch (e) {
          console.log(e)
        }
      }
    )
})
