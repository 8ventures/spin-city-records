import { api } from "~/utils/api";

function WishList() {
  const albumQuery = api.albums.getAll.useQuery();
  const albums = albumQuery.data;

  return (
    <>
      <h2>Wish List</h2>
      {albums?.map((album) => (
        <div
          key={album.id}
          className="m-10 flex w-[250px] flex-col items-center"
        >
          <img src={album.artwork} alt={album.name} className="rounded-xl" />
          <div>
            <h2>{album.name}</h2>
          </div>
        </div>
      ))}
    </>
  );
}

export default WishList;
