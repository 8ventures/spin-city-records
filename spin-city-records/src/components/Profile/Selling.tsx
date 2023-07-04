import { api } from "~/utils/api";
import { useUser } from "@clerk/nextjs";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/solid";

function Selling() {
  const albumQuery = api.albums.getAll.useQuery();
  const albums = albumQuery.data;

  const user = useUser();
  const currentUserId = user.user?.id;
  const clerkId = currentUserId || "";

  const stripeIdQuery = api.sellers.getStripeId.useQuery({
    clerkId: clerkId,
  });
  const stripeId = stripeIdQuery.data as string | undefined;

  const listingQuery = api.listings.getByUserId.useQuery({
    stripeId: stripeId,
  });
  const listings = listingQuery.data;

  if (!currentUserId || stripeIdQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (stripeIdQuery.isError) {
    return <div>Error occurred while fetching stripe ID</div>;
  }

  if (listingQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (listingQuery.isError) {
    return <div>Error occurred while fetching listings</div>;
  }

  return (
    <div className="flex items-center justify-center">
      <table className="m-10 table-auto space-y-6">
        <thead className="bg-[#FF5500]">
          <tr>
            <th className="p-3 text-left">Album</th>
            <th className="p-3 text-left">Condition</th>
            <th className="p-3 text-left">Description</th>
            <th className="p-3 text-left">Price</th>
            <th className="p-3 text-left">Currency</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {listings?.map((listing) => {
            const album = albums?.find((album) => album.id === listing.albumId);

            return (
              <tr key={listing.id} className="border-b border-gray-900">
                <td className="p-3">
                  {album ? (
                    <img
                      src={album.artwork}
                      alt={album.name}
                      className="h-44 w-44 rounded"
                    />
                  ) : (
                    <div>No image available</div>
                  )}
                </td>
                <td className="p-3">{listing.condition}</td>
                <td className="p-3">{listing.description}</td>
                <td className="p-3">{listing.price}</td>
                <td className="p-3">{listing.currency}</td>
                <td className="p-3">Complete</td>
                <td>
                  <div className="m-2 flex h-16 w-16 items-center">
                    <PencilIcon className="m-1" />
                    <TrashIcon className="m-1" />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Selling;
