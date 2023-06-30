import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";
import { clerkClient } from "@clerk/nextjs";

export const stripeRouter = createTRPCRouter({
  checkoutSession: privateProcedure
    .mutation(
      async ({ ctx }) => {
        try {
          const session = await ctx.stripe.checkout.sessions.create({
            line_items: [
              {
                // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                price: '{{PRICE_ID}}',
                quantity: 1,
              },
            ],
            mode: 'payment',
            success_url: 'http://localhost:3000/success',
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
