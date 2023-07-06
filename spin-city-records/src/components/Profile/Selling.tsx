import { api } from "~/utils/api";
import { useUser } from "@clerk/nextjs";
import { TrashIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { Listing } from "~/utils/types";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { serif, sans } from "../../utils/fonts";
import { useRouter } from "next/router";

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
  const router = useRouter();
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

  const handleClickListings = (listing: Listing) => {
    const normalizedArtist = listing.album?.artist?.name?.replace(/\s+/g, "-");
    const normalizedAlbum = listing.album?.name?.replace(/\s+/g, "-");
    router
      .push({
        pathname: `/artist/${normalizedArtist}/${normalizedAlbum}`,
        query: { id: listing.album?.id },
      })
      .catch((e) => console.log(e));
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

  //Render
  if (listingData && listingData.length === 0) {
    return (
      <section className="mx-auto flex w-full flex-col items-center justify-center overflow-hidden">
        <div className="mx-auto my-16 text-center align-middle text-xl text-white">
          Couldn't find any listings.{" "}
          {stripeId ? (
            <span
              className="block cursor-pointer text-[#FF5500] underline underline-offset-4"
              onClick={() =>
                router.push("/createListing").catch((err) => console.log(err))
              }
            >
              Start selling
            </span>
          ) : (
            <span
              className="block cursor-pointer text-[#FF5500] underline underline-offset-4"
              onClick={() =>
                router.push("/startSelling").catch((err) => console.log(err))
              }
            >
              Become a seller
            </span>
          )}
        </div>
      </section>
    );
  }
  if (listingData && listingData.length !== 0) {
    return (
      <>
        <div className="mx-2 flex flex-col text-white md:mx-auto md:w-2/3 ">
          <div className="  flex justify-end text-white ">
            <DropdownMenu.Root>
              <DropdownMenu.Trigger className="text-md my-4 mr-12 inline outline-none md:text-lg">
                Filter by Status: {""}
                {options.find((option) => option.value === statusFilter)?.label}
              </DropdownMenu.Trigger>
              <DropdownMenu.Content className="w-44 rounded-xl bg-white p-4  text-sm text-black md:text-lg">
                {options.map((option) => (
                  <DropdownMenu.Item
                    key={option.value}
                    onSelect={() => handleFilterChange(option.value)}
                    className="cursor-pointer rounded text-center  outline-none hover:bg-slate-200"
                  >
                    {option.label}
                  </DropdownMenu.Item>
                ))}
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </div>
          <div className=" mb-16 w-full   text-white">
            <table className="w-full text-center">
              <thead className="bg-[#FF5500]">
                <tr>
                  <th
                    className={`p-3 text-center ${serif.className} text-xs md:text-lg lg:text-lg`}
                  >
                    Album
                  </th>
                  <th
                    className={`p-3 text-center ${serif.className} text-xs md:text-lg lg:text-lg`}
                  >
                    {" "}
                    Details
                  </th>
                  <th
                    className={`p-3 text-center ${serif.className} text-xs md:text-lg lg:text-lg`}
                  >
                    {" "}
                    Description
                  </th>
                  <th
                    className={`p-3 text-center ${serif.className} text-xs md:text-lg lg:text-lg`}
                  >
                    {" "}
                    Price
                  </th>
                  <th
                    className={`p-3 text-center ${serif.className} text-xs md:text-lg lg:text-lg`}
                  >
                    {" "}
                    Status
                  </th>
                  <th
                    className={`p-3 text-center ${serif.className} text-xs md:text-lg lg:text-lg`}
                  >
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody className="">
                {applyStatusFilter()?.map((listing) => {
                  return (
                    <tr key={listing.id} className="border-b border-gray-900">
                      <td className="flex flex-col items-center justify-center p-3">
                        {listing.album ? (
                          <>
                            <img
                              src={listing.album.artwork}
                              alt={listing.album.name}
                              className="h-12 w-12 cursor-pointer rounded object-cover"
                              onClick={() => handleClickListings(listing)}
                            />
                            <div className="ml-2 p-3  text-xs md:text-base">
                              {listing.album.name}
                            </div>
                          </>
                        ) : (
                          <div>No image available</div>
                        )}
                      </td>
                      <td className="ml-2 p-3  text-xs md:text-xs lg:text-base">
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
                      <td className="lg:text-md ml-2 p-3  text-xs md:text-base">
                        {listing.description}
                      </td>
                      <td className="lg:text-md ml-2 p-3  text-xs md:text-base">
                        {listing.price} {listing.currency.toUpperCase()}
                      </td>
                      <td className="lg:text-md ml-2 p-3  text-xs md:text-base">
                        {listing.order ? (
                          <DropdownMenu.Root>
                            <DropdownMenu.Trigger className="inline text-center outline-none">
                              {listing.order?.status || "No Order"}
                            </DropdownMenu.Trigger>
                            <DropdownMenu.Content className="w-44 rounded-xl bg-white p-4 text-center  text-black">
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
                      <td className="lg:text-md ml-2 p-3  text-xs md:text-base">
                        <div className="flex h-6 w-6 items-center md:h-8 md:w-8">
                          <TrashIcon
                            className="ml-1 cursor-pointer hover:text-custom-orange "
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
        </div>
      </>
    );
  }
}

export default Selling;
