import { PrismaClient } from '@prisma/client'
import { mockArtists } from './mockData/mockArtists';
import { mockAlbums } from './mockData/mockAlbums';

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

