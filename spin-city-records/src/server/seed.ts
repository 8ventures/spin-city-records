import { PrismaClient, Prisma } from '@prisma/client'
import { mockAlbums } from './mockData/mockAlbums';
import { mockListings } from './mockData/mockListings';
import { mockArtists } from './mockData/mockArtists';

const prisma = new PrismaClient();


async function main() {
  try {
    console.log('Removing existing data');
    await prisma.album.deleteMany();
    await prisma.artist.deleteMany();
    await prisma.listing.deleteMany();
    console.log('Start seeding ...');
    await prisma.album.createMany({
      data: mockAlbums
    })
    console.log('Albums seeded');
    await prisma.listing.createMany({
      data: mockListings
    })
    console.log('Listings seeded')
    await prisma.artist.createMany({
      data: mockArtists
    })
    console.log('Artists seeded')
  } catch (e) {
    console.log(e);;
  };
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

