import { PrismaClient } from '@prisma/client'
// import { mockArtists } from './mockData/mockArtists';
// import { mockAlbums } from './mockData/mockAlbums';
// import { mockUsers } from './mockData/mockUsers'
// import { mockListings } from './mockData/mockListings';
import { editions } from './mockData/editions'
import type { SeedEdition } from './mockData/editions';
import { artistIds } from './mockData/artistsIds';
import { getArtistInfo }  from './spotifySeed'
import type { ArtistId } from './mockData/artistsIds';

const prisma = new PrismaClient();

const seedArtistsAndAlbums = async (artists: ArtistId[]) => {
  try {
    // console.log('Removing Artists and Albums...');
    // const deleteAlbums = prisma.album.deleteMany({})
    // const deleteArtists = prisma.artist.deleteMany({});
    // await prisma.$transaction([deleteAlbums, deleteArtists])
    // console.log('Data removed')

    console.log('Seeding Aritsts...')
    for ( const artist of artists) {
      const artistInfo = await getArtistInfo(artist.spotifyId, artist.discogsId);
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
    }
    console.log('Artists added!')
  } catch (e) {
    console.log(e)
  }
}

const seedEditions = async (editions: SeedEdition[]) => {
  try {
    console.log('Removing Currnet Editions...');
    await prisma.edition.deleteMany();
    console.log('Editions removed')

    console.log('Seeding Editions...')
    for (const e of editions) {
      await prisma.edition.create({
        data: e
      })
    }
    console.log('editions added')
  } catch (e) {
    console.log(e)
  }
}

async function main() {
  try {
    console.log('Starting seeding...');
   
    // await prisma.listing.deleteMany();
    // console.log('Data Removed')
    await seedArtistsAndAlbums(artistIds)
    await seedEditions(editions)
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

