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
     checkoutInput.array()
    )
    .query(
      async ({ ctx, input }) => {
        try {
          if(input[0]) {
            const paymentIntent = await ctx.stripe.paymentIntents.create({
              amount: calcOrderAmount(input),
              currency: input[0].currency,
              automatic_payment_methods: {
                enabled: true,
              },
              application_fee_amount: 500,
              transfer_data: {
                destination: input[0].stripeId
              }
            })
            return paymentIntent.client_secret
          }
        } catch (e) {
          console.log(e)
        }
      }
    )
})

//     async ({ ctx, input }) => {
//       try {
//         const session = await ctx.stripe.checkout.sessions.create({
//           line_items: [
//             {
//               price: input.stripePrice,
//               quantity: 1,
//             },
//           ],
//           payment_intent_data: {
//             application_fee_amount: 500,
//             transfer_data: {
//               destination: input.stripeId
//             }
//           },
//           mode: 'payment',
//           success_url: 'http://localhost:3000/PaymentSuccess',
//           cancel_url: 'http://localhost:3000/fail',
//           automatic_tax: {enabled: true},
//         });
//         console.log(session)
//         return session.url
//       } catch (e) {
//         console.log(e)
//       }
//     }
//   )
// })
