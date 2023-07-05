import { api } from "~/utils/api";
import { useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useRouter } from "next/router";
import type { Listing } from "~/utils/types";

const options = [
  { value: "All", label: "All" },
  { value: "Awaiting Payment", label: "Awaiting Payment" },
  { value: "Awaiting Shipment", label: "Awaiting Shipment" },
  { value: "Shipped", label: "Shipped" },
  { value: "Complete", label: "Complete" },
  { value: "No Order", label: "No Order" },
];

function MyOrders() {
  const [statusFilter, setStatusFilter] = useState(options[0]?.value);
  const router = useRouter()

  const orderQuery = api.orders.getBuyerOrders.useQuery();
  const orders = orderQuery.data;

  const albumQuery = api.albums.getAll.useQuery();
  const albums = albumQuery.data;

  const handleFilterChange = (value: string) => {
    setStatusFilter(value);
  };

  const checkoutItem = (listing: Listing): void => {
    console.log(listing)
    router.push({
      pathname: '/checkout',
      query: {id: listing.id}
    }).catch((e)=>(console.log(e)))
  }

  const applyStatusFilter = () => {
    return statusFilter === "All"
      ? orders
      : orders?.filter((order) => order.status === statusFilter);
  };

  if (orderQuery.isLoading || albumQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (orderQuery.isError) {
    return <div>An error occurred: {orderQuery.error.message}</div>;
  }

  if (albumQuery.isError) {
    return <div>An error occurred: {albumQuery.error.message}</div>;
  }

  return (
    <>
      <div className="flex justify-end text-white lg:mr-28">
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
                className="cursor-pointer rounded text-center outline-none hover:bg-slate-200"
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
              <th className="p-3 text-left">Album</th>
              <th className="p-3 text-left">Details</th>
              <th className="p-3 text-left">Description</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Currency</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {applyStatusFilter()?.map((order) => {
              const listing = order.Listings[0];
              const album = albums?.find(
                (album) => album.id === listing?.albumId
              );
              return (
                <tr key={order.id} className="border-b border-gray-900">
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
                  <td className="p-3 text-sm md:text-base">
                    {listing?.condition || "N/A"} <br />
                    {listing?.format || "N/A"} <br />
                    {listing?.speed || "N/A"} <br />
                    {listing?.weight || "N/A"}
                    <br />
                  </td>
                  <td className="p-3 text-sm md:text-base">
                    {listing?.description || "N/A"}
                  </td>
                  <td className="p-3 text-sm md:text-base">
                    {listing?.price || "N/A"}
                  </td>
                  <td className="p-3 text-sm md:text-base">
                    {(listing?.currency || "N/A").toUpperCase()}
                  </td>
                  <td className="p-3 text-sm md:text-base">
                    { order.status === 'Awaiting Payment' ? 
                      (<button
                        className='bg-white text-black hover:bg-[#FF5500] hover:text-white p-2'
                        onClick={() => checkoutItem(listing)}
                        >{order.status}</button>
                      ) : <>{order.status}</>
                    }
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

export default MyOrders;
