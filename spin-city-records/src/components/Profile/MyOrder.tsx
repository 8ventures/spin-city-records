import { api } from "~/utils/api";
import { useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

const options = [
  { value: "All", label: "All" },
  { value: "Awaiting Payment", label: "Awaiting Payment" },
  { value: "Awaiting Shipment", label: "Awaiting Shipment" },
  { value: "Shipped", label: "Shipped" },
  { value: "Complete", label: "Complete" },
];

function MyOrders() {
  const [statusFilter, setStatusFilter] = useState(options[0]?.value);

  const orderQuery = api.orders.getBuyerOrders.useQuery();
  const orders = orderQuery.data;

  const handleFilterChange = (value: string) => {
    setStatusFilter(value);
  };

  const applyStatusFilter = () => {
    return statusFilter === "All"
      ? orders
      : orders?.filter((order) => order.status === statusFilter);
  };

  if (orderQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (orderQuery.isError) {
    return <div>An error occurred: {orderQuery.error.message}</div>;
  }

  return (
    <>
      <div className="flex justify-end text-white lg:mr-28">
        <DropdownMenu.Root>
          <DropdownMenu.Trigger className="my-4 mr-12 inline outline-none sm:mr-14">
            Filter by Status: {""}
            {options.find((option) => option.value === statusFilter)?.label}
          </DropdownMenu.Trigger>
          <DropdownMenu.Content className="text-md w-44 rounded-xl bg-white p-4 font-sans text-black">
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
            </tr>
          </thead>
          <tbody>
            {applyStatusFilter()?.map((order) => {
              const listing = order.Listings[0];
              const album = listing?.album;
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
                        <div className="mt-2 w-12 text-center font-sans md:w-44">
                          {album.name}
                        </div>
                      </>
                    ) : (
                      <div>No image available</div>
                    )}
                  </td>
                  <td className="p-3 font-sans text-sm md:text-base">
                    <b>Condition: </b> {listing?.condition || "N/A"} <br />
                    <b>Format: </b> {listing?.format || "N/A"} <br />
                    <b>Speed: </b> {listing?.speed || "N/A"} <br />
                    <b>Weight: </b> {listing?.weight || "N/A"}
                    <br />
                  </td>
                  <td className="p-3 font-sans text-sm md:text-base">
                    {listing?.description || "N/A"}
                  </td>
                  <td className="p-3 font-sans text-sm md:text-base">
                    {listing?.price || "N/A"}{" "}
                    {(listing?.currency || "N/A").toUpperCase()}
                  </td>
                  <td className="p-3 font-sans text-sm md:text-base">
                    {order.status}
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
