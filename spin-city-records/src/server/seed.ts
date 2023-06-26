import { PrismaClient, Prisma } from '@prisma/client'
import { mockAlbums } from './mockData/mockAlbums';
import { mockListings } from './mockData/mockListings';
import { mockArtists } from './mockData/mockArtists';
import { mockReviews } from './mockData/mockReviews';

const prisma = new PrismaClient();

const albums = Prisma.AlbumCreateInput[] {

}

async function main() {
  console.log('Start seeding ...');
  for (const l of mockListings) {
    const listing = await prisma.listing.create({
      data: l
    })
  }
  console.log('Albums added')
  for (const r of mockReviews) {
    const review = await prisma.categoryName.create({
      data: r
    })
  }
  console.log('Reviews added')
  for (const a of mockArtists) {
    const review = await prisma.artist.create({
      data: a
    })
  }
  console.log('Artists added')
  for (const a of mockAlbums) {
    const review = await prisma.artist.create({
      data: a
    })
  }
  console.log('Artists added')
  console.log('Seeding finished.')
  // const allUsers = await prisma.user.findMany()
  // console.log(allUsers)

}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  })

