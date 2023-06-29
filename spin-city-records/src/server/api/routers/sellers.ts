import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";
import { clerkClient } from "@clerk/nextjs";

export const sellersRouter = createTRPCRouter({
  create: privateProcedure
    .mutation(
      async ({ ctx }) => {
        try {
          // Create Stripe Account
          const account = await ctx.stripe.accounts.create({ 
            type : 'express',
            email: ctx.user.emailAddresses[0]?.emailAddress as unknown as string,
            business_type: 'individual'
          }) 
          // Add account to DB
          await ctx.prisma.seller.create({
            data: {
              sellerId: account.id
            }
          })
          // Attach account to clerk DB
          await clerkClient.users.updateUser(ctx.user.id, {
            privateMetadata: {
              stripeId: account.id
            }
          })
          
          const {url} = await ctx.stripe.accountLinks.create({
            account: account?.id,
            refresh_url: 'http://localhost:3000/seller',
            return_url: 'http://localhost:3000/profile',
            type: 'account_onboarding'
          })
          return url 
        } catch (e) {
          console.log(e)
          console.log('Failed to create a Stripe account.');
        }
      }
    )
});
