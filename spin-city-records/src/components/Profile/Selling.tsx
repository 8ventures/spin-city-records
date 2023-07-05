import { api } from "~/utils/api";
import { useUser } from "@clerk/nextjs";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { Listing } from "~/utils/types";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

const options = [
  { value: "All", label: "All" },
  { value: "Awaiting Payment", label: "Awaiting Payment" },
  { value: "Awaiting Shipment", label: "Awaiting Shipment" },
  { value: "Shipped", label: "Shipped" },
  { value: "Complete", label: "Complete" },
  { value: "No Order", label: "No Order" },
];

function Selling() {
  const [statusFilter, setStatusFilter] = useState(options[0]?.value);
  const deleteListing = api.listings.deleteListing.useMutation();

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
  console.log(listingData);

  const orderQuery = api.orders.getAllOrders.useQuery();
  const orders = orderQuery.data;
  console.log(orders);

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

  const handleFilterChange = (value: string) => {
    setStatusFilter(value);
  };

  function getOrderStatus(listingId: string | null) {
    if (listingId === null) {
      return "No Order";
    }
    const order = orders?.find((order) => order.id === listingId);
    return order ? order.status : "No Order";
  }

  const applyStatusFilter = () => {
    return statusFilter === "All"
      ? listings
      : listings.filter(
          (listing) => getOrderStatus(listing.orderId || null) === statusFilter
        );
  };

  return (
    <>
      <div className="flex justify-end lg:mr-20">
        <DropdownMenu.Root>
          <DropdownMenu.Trigger className="my-4 mr-12 inline text-lg outline-none sm:mr-14">
            Filter by Status: {""}
            {options.find((option) => option.value === statusFilter)?.label}
          </DropdownMenu.Trigger>
          <DropdownMenu.Content className="text-md w-44 rounded-xl bg-white p-4 text-black">
            {options.map((option) => (
              <DropdownMenu.Item
                key={option.value}
                onSelect={() => handleFilterChange(option.value)}
                className="cursor-pointer rounded text-center outline-none hover:bg-slate-400"
              >
                {option.label}
              </DropdownMenu.Item>
            ))}
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </div>
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
              <th className="p-3 text-left">Delete</th>
            </tr>
          </thead>
          <tbody>
            {applyStatusFilter()?.map((listing) => {
              const album = albums?.find(
                (album) => album.id === listing.albumId
              );

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
                  <td className="p-3">
                    {getOrderStatus(listing.orderId || null)}
                  </td>
                  <td>
                    <div className="m-2 flex h-9 w-9 items-center">
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
    </>
  );
}

export default Selling;
