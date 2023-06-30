import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";

export const stripeRouter = createTRPCRouter({
  checkoutSession: privateProcedure
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
