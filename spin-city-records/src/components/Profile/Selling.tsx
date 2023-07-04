import { api } from "~/utils/api";
import { useUser } from "@clerk/nextjs";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { Listing } from "~/utils/types";

function Selling() {
  const deleteListing = api.sellers.deleteListing.useMutation();

  const albumQuery = api.albums.getAll.useQuery();
  const albums = albumQuery.data;

  const user = useUser();
  const currentUserId = user.user?.id;

  const stripeIdQuery = api.sellers.getStripeId.useQuery({
    clerkId: currentUserId || "",
  });
  const stripeId = stripeIdQuery.data as string | undefined;

  const listingQuery = api.listings.getByUserId.useQuery({
    stripeId: stripeId,
  });

  const listingData = listingQuery.data;

  const [listings, setListings] = useState<Listing[]>([]);

  useEffect(() => {
    if (listingData) {
      setListings(listingData);
    }
  }, [listingQuery.data]);

  const handleDeleteListing = async (listingId: string) => {
    if (confirm("Are you sure you want to delete this listing")) {
      try {
        await deleteListing.mutateAsync({ listingId });

        if (listings) {
          setListings(listings.filter((listing) => listing.id !== listingId));
        }
      } catch (error) {
        console.log("Error occurred while deleting the listing.", error);
      }
    }
  };

  if (!currentUserId || stripeIdQuery.isLoading || listingQuery.isLoading) {
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
            <th className="p-3 text-left">Details</th>
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
                    <>
                      <img
                        src={album.artwork}
                        alt={album.name}
                        className="h-12 w-12 rounded md:h-44 md:w-44"
                      />
                      <div className="mt-2 w-12 text-center md:w-44">
                        {album.name}
                      </div>
                    </>
                  ) : (
                    <div>No image available</div>
                  )}
                </td>
                <td className="p-3">
                  {listing.condition} <br />
                  {listing.format} <br />
                  {listing.speed} <br />
                  {listing.weight}
                  <br />
                </td>
                <td className="p-3">{listing.description}</td>
                <td className="p-3">{listing.price}</td>
                <td className="p-3">{listing.currency.toUpperCase()}</td>
                <td className="p-3">Complete</td>
                <td>
                  <div className="m-2 flex h-16 w-16 items-center">
                    <PencilIcon className="m-1" />
                    <TrashIcon
                      className="m-1 cursor-pointer"
                      onClick={() => handleDeleteListing(listing.id)}
                    />
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
