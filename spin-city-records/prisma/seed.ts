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
    // await prisma.edition.deleteMany();
    console.log('Data Removed')

    // for (const a of mockArtists) {
    //   const albumOfArtist = mockAlbums.filter((al) => (al.artist === a.name) )
    //   const albums = albumOfArtist.map((al) => {
    //     const {artist, ...album} = al;
    //     return album
    //   })
    //   await prisma.artist.create({
    //     data: {
    //       ...a,
    //       albums: {
    //         createMany: {
    //           data: albums
    //         }
    //       }
    //     }
    //   })
    // }
    // console.log('Artists and Albums added')   
    
    // for (const e of editions) {
    //   await prisma.edition.create({
    //     data: e
    //   })
    // }
    // console.log('editions added')

    for (const l of mockListings) {
      const {edition, sellerId, albumId, ...listing} = l
      await prisma.listing.create({
        data: {
          ...listing,
          edition: {
            connect: edition
          },
          seller: {
            connect: {
              sellerId: sellerId
            }
          },
          album: {
            connect: {
              id: albumId
            }
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

