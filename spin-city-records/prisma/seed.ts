import { PrismaClient } from '@prisma/client'
import { mockArtists } from './mockData/mockArtists';
import { mockAlbums } from './mockData/mockAlbums';
import { mockUsers } from './mockData/mockUsers'
import { mockListings } from './mockData/mockListings';

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Removing existing data');
    await prisma.album.deleteMany();
    await prisma.artist.deleteMany();
    console.log('Data Removed')

    for (const a of mockArtists) {
      await prisma.artist.create({
        data: a
      })
    }
    console.log('Artist added')   

    for (const a of mockAlbums) {
      const { artist, ...album} = a
      const dbArtist = await prisma.artist.findFirst({
        where: {
          name: artist
        }
      })
      if (dbArtist) {
        await prisma.album.create({
          data: {
            ...album,
            artistId: dbArtist.id
          }
        })
      }
    }
    console.log('Albums added')

    for (const u of mockUsers) {
      await prisma.user.create({
        data: u
      })
    }
    console.log('Users Added')

    const dbAlbums = await prisma.album.findMany();
    if (dbAlbums.length > 0 ) {
      for (const l of mockListings) {
        const index = Math.floor(Math.random()*(dbAlbums.length))
        if (dbAlbums[index]) {
          await prisma.listing.create({
            data: {
              ...l,
              albumId: dbAlbums[index]!.id
            }
          })
        }
      }
    }
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

