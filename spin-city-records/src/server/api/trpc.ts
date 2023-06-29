import { getAuth, clerkClient } from "@clerk/nextjs/server";
import { initTRPC, TRPCError } from "@trpc/server";
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
import superjson from "superjson";
import { ZodError } from "zod";
import { prisma } from "~/server/db";
import type {User} from '@clerk/nextjs/api'
import { stripe } from '../../utils/getStripe'

interface UserProps {
  user: User | null
}

const createInnerTRPCContext = ( {user}: UserProps) => {
  return {
    stripe,
    prisma,
    user
  };
};

export const createTRPCContext = async (opts: CreateNextContextOptions) => {
  async function getUser() {
    const {userId} = getAuth(opts.req);
    const user = userId ? await clerkClient.users.getUser(userId) : null
    return user
  }
  const user = await getUser();
  return createInnerTRPCContext({user})
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const createTRPCRouter = t.router;

export const publicProcedure = t.procedure;

const isAuthed = t.middleware( async ({ next, ctx }) => {
  if (!ctx.user?.id) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
    });
  }
  return next({
    ctx: {
      user: ctx.user,
      prisma: ctx.prisma
    },
  });
});

export const privateProcedure = t.procedure.use(isAuthed);
