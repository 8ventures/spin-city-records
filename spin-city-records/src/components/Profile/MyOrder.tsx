import { api } from "~/utils/api";
import { useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

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

  const orderQuery = api.orders.getBuyerOrders.useQuery();
  const orders = orderQuery.data;

  const albumQuery = api.albums.getAll.useQuery();
  const albums = albumQuery.data;

  const handleFilterChange = (value: string) => {
    setStatusFilter(value);
  };

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
                  <td className="p-3">
                    {listing?.condition || "N/A"} <br />
                    {listing?.format || "N/A"} <br />
                    {listing?.speed || "N/A"} <br />
                    {listing?.weight || "N/A"}
                    <br />
                  </td>
                  <td className="p-3">{listing?.description || "N/A"}</td>
                  <td className="p-3">{listing?.price || "N/A"}</td>
                  <td className="p-3">
                    {(listing?.currency || "N/A").toUpperCase()}
                  </td>
                  <td className="p-3">{order.status}</td>
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
