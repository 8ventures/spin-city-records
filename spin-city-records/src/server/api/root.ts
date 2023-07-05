import { albumsRouter } from "~/server/api/routers/albums";
import { listingsRouter } from "./routers/listings";
import { collectionRouter } from "./routers/collections";
import { sellersRouter } from "./routers/sellers";
import { artistsRouter } from "./routers/artists";
import { editionsRouter } from "./routers/editions";
import { createTRPCRouter } from "~/server/api/trpc";
import { stripeRouter } from "./routers/stripe";

import { ordersRouter } from "./routers/order";


export const appRouter = createTRPCRouter({
  albums: albumsRouter,
  listings: listingsRouter,
  collections: collectionRouter,
  sellers: sellersRouter,
  stripe: stripeRouter,
  artists: artistsRouter,
  editions: editionsRouter,
  orders: ordersRouter
});

export type AppRouter = typeof appRouter;
