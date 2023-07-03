import { PrismaClient } from '@prisma/client'
// import { mockArtists } from './mockData/mockArtists';
// import { mockAlbums } from './mockData/mockAlbums';
// import { mockUsers } from './mockData/mockUsers'
// import { mockListings } from './mockData/mockListings';
// import { editions } from './mockData/editions'
import { getArtistInfo }  from './spotifySeed'

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Removing existing data');
    // await prisma.album.deleteMany();
    // await prisma.artist.deleteMany();
    // await prisma.listing.deleteMany();
    // await prisma.edition.delete();
    // console.log('Data Removed')
    const artistInfo = await getArtistInfo('3PP6ghmOlDl2jaKaH0avUN', '6959133');
    if(artistInfo) {
      await prisma.artist.create({
        data: {
          ...artistInfo.artist,
          albums: {
            createMany: {
              data: artistInfo.albums
            }
          }
        }
      })
    }
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

    // for (const l of mockListings) {
    //   const {edition, sellerId, albumId, ...listing} = l
    //   await prisma.listing.create({
    //     data: {
    //       ...listing,
    //       edition: {
    //         connect: edition
    //       },
    //       seller: {
    //         connect: {
    //           sellerId: sellerId
    //         }
    //       },
    //       album: {
    //         connect: {
    //           id: albumId
    //         }
    //       }
    //     }
    //   })
    // }
    // console.log('Listings added')
    console.log('Seeding success')
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

