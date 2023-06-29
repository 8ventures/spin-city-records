import { albumsRouter } from "~/server/api/routers/albums";
import { listingsRouter } from "./routers/listings";
import { collectionRouter } from "./routers/collections";
import { artistsRouter } from "./routers/artists";
import { createTRPCRouter } from "~/server/api/trpc";

export const appRouter = createTRPCRouter({
  albums: albumsRouter,
  listings: listingsRouter,
  collections: collectionRouter,
  artists: artistsRouter,
});

export type AppRouter = typeof appRouter;
