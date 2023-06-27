import { albumsRouter } from "~/server/api/routers/albums";
import { createTRPCRouter } from "~/server/api/trpc";
import { listingsRouter } from "./routers/listings";

export const appRouter = createTRPCRouter({
  albums: albumsRouter,
  listings: listingsRouter,
});

export type AppRouter = typeof appRouter;
