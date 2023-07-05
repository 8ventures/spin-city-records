import { api } from "~/utils/api";
import { useUser } from "@clerk/nextjs";
import { TrashIcon } from "@heroicons/react/24/solid";
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

const statusOptions = [
  { value: "Awaiting Payment", label: "Awaiting Payment" },
  { value: "Awaiting Shipment", label: "Awaiting Shipment" },
  { value: "Shipped", label: "Shipped" },
  { value: "Complete", label: "Complete" },
];

function Selling() {
  const [statusFilter, setStatusFilter] = useState(options[0]?.value);
  const deleteListing = api.listings.deleteListing.useMutation();
  const changeStatus = api.orders.changeStatus.useMutation();

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
      setListings(listingData as Listing[]);
    }
  }, [listingData]);

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

  if (listingQuery.isError) {
    return <div>Error occurred while fetching listings</div>;
  }

  const handleFilterChange = (value: string) => {
    setStatusFilter(value);
  };

  const applyStatusFilter = () => {
    if (statusFilter === "All") return listings;
    if (statusFilter === "No Order")
      return listings.filter((listing) => !listing.order);
    return listings.filter((listing) => listing.order?.status === statusFilter);
  };

  const handleChangeStatus = async (orderId: string, status: string) => {
    try {
      await changeStatus.mutateAsync({
        orderId,
        status: status as
          | "Awaiting Payment"
          | "Awaiting Shipment"
          | "Shipped"
          | "Complete",
      });
      setListings(
        listings.map((listing) =>
          listing.order?.id === orderId
            ? { ...listing, order: { ...listing.order, status } }
            : listing
        )
      );
    } catch (error) {
      console.log("Error occurred while changing the order status.", error);
    }
  };

  return (
    <>
      <div className="flex justify-end text-white lg:mr-28">
        <DropdownMenu.Root>
          <DropdownMenu.Trigger className="my-4 mr-12 inline outline-none sm:mr-14">
            Filter by Status: {""}
            {options.find((option) => option.value === statusFilter)?.label}
          </DropdownMenu.Trigger>
          <DropdownMenu.Content className="w-44 rounded-xl bg-white p-4 font-sans text-black">
            {options.map((option) => (
              <DropdownMenu.Item
                key={option.value}
                onSelect={() => handleFilterChange(option.value)}
                className="cursor-pointer rounded text-center font-sans outline-none hover:bg-slate-200"
              >
                {option.label}
              </DropdownMenu.Item>
            ))}
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </div>
      <div className="ml-4 mr-4 rounded-lg text-white shadow-md sm:overflow-x-auto md:ml-40 md:mr-40">
        <table className="w-full border-collapse text-left">
          <thead className="bg-[#FF5500]">
            <tr>
              <th className="p-3 text-left font-serif">Album</th>
              <th className="p-3 text-left font-serif">Details</th>
              <th className="p-3 text-left font-serif">Description</th>
              <th className="p-3 text-left font-serif">Price</th>
              <th className="p-3 text-left font-serif">Status</th>
              <th className="p-3 text-left font-serif">Delete</th>
            </tr>
          </thead>
          <tbody className="">
            {applyStatusFilter()?.map((listing) => {
              return (
                <tr key={listing.id} className="border-b border-gray-900">
                  <td className="p-3">
                    {listing.album ? (
                      <>
                        <img
                          src={listing.album.artwork}
                          alt={listing.album.name}
                          className="h-12 w-12 rounded md:h-44 md:w-44"
                        />
                        <div className="mt-2 w-12 text-center font-sans md:w-44">
                          {listing.album.name}
                        </div>
                      </>
                    ) : (
                      <div>No image available</div>
                    )}
                  </td>
                  <td className="p-3 text-sm md:text-base">
                    <b>Condition: </b>
                    {listing.condition} <br />
                    <b>Format: </b>
                    {listing.format} <br />
                    <b>Speed: </b>
                    {listing.speed} <br />
                    <b>Weight: </b>
                    {listing.weight}
                    <br />
                  </td>
                  <td className="p-3 font-sans text-sm md:text-base">
                    {listing.description}
                  </td>
                  <td className="p-3 font-sans text-sm md:text-base">
                    {listing.price} {listing.currency.toUpperCase()}
                  </td>
                  <td className="p-3 font-sans sm:text-sm md:text-base">
                    {listing.order ? (
                      <DropdownMenu.Root>
                        <DropdownMenu.Trigger className="my-4 mr-12 inline text-left font-sans outline-none">
                          {listing.order?.status || "No Order"}
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Content className="w-44 rounded-xl bg-white p-4 font-sans text-black">
                          {statusOptions.map((option) => (
                            <DropdownMenu.Item
                              key={option.value}
                              onSelect={() => {
                                if (listing.order) {
                                  handleChangeStatus(
                                    listing.order.id,
                                    option.value
                                  );
                                }
                              }}
                              className="cursor-pointer rounded text-center outline-none hover:bg-slate-200"
                            >
                              {option.label}
                            </DropdownMenu.Item>
                          ))}
                        </DropdownMenu.Content>
                      </DropdownMenu.Root>
                    ) : (
                      "No Order"
                    )}
                  </td>
                  <td className="p-3 font-sans text-sm md:text-base">
                    <div className="flex h-8 w-8 items-center">
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
