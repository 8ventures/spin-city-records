import { albumsRouter } from "~/server/api/routers/albums";
import { createTRPCRouter } from "~/server/api/trpc";

export const appRouter = createTRPCRouter({
  albums: albumsRouter,
});

export type AppRouter = typeof appRouter;
