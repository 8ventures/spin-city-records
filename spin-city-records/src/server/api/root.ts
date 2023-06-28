import { albumsRouter } from "~/server/api/routers/albums";
import { listingsRouter } from "./routers/listings";
import { createTRPCRouter } from "~/server/api/trpc";

export const appRouter = createTRPCRouter({
  albums: albumsRouter,
  listings: listingsRouter,
});

export type AppRouter = typeof appRouter;
