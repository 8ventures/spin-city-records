import { PrismaClient } from '@prisma/client'
import { mockArtists } from './mockData/mockArtists';
import { mockAlbums } from './mockData/mockAlbums';
import { mockUsers } from './mockData/mockUsers'
import { mockListings } from './mockData/mockListings';
import { editions } from './mockData/editions'

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Removing existing data');
    // await prisma.album.deleteMany();
    // await prisma.artist.deleteMany();
    await prisma.listing.deleteMany();
    // await prisma.special.deleteMany(); // commented out to stop indexs of special types changing
    // await prisma.user.deleteMany();
    console.log('Data Removed')

    // for (const a of mockArtists) {
    //   await prisma.artist.create({
    //     data: a
    //   })
    // }
    // console.log('Artist added')   

    // for (const a of mockAlbums) {
    //   const { artist, ...album} = a
    //   const dbArtist = await prisma.artist.findFirst({
    //     where: {
    //       name: artist
    //     }
    //   })
    //   if (dbArtist) {
    //     await prisma.album.create({
    //       data: {
    //         ...album,
    //         artistId: dbArtist.id
    //       }
    //     })
    //   }
    // }
    // console.log('Albums added')
    
    // for (const e of editions) {
    //   await prisma.special.create({
    //     data: e
    //   })
    // }
    // console.log('editions added')

    // for (const u of mockUsers) {
    //   await prisma.user.create({
    //     data: u
    //   })
    // }
    // console.log('Users Added')

    for (const l of mockListings) {
      const {special, ...listing} = l
      await prisma.listing.create({
        data: {
          ...listing,
          special: {
            connect: special
          }
        }
      })
    }
    console.log('Listings added')
  } catch (e) {
    console.log(e)
  }
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

