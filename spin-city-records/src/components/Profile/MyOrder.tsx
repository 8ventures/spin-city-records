import { api } from "~/utils/api";
import { useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useRouter } from "next/router";
import type { Listing } from "~/utils/types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { serif } from "~/utils/fonts";

const options = [
  { value: "All", label: "All" },
  { value: "Awaiting Payment", label: "Awaiting Payment" },
  { value: "Awaiting Shipment", label: "Awaiting Shipment" },
  { value: "Shipped", label: "Shipped" },
  { value: "Complete", label: "Complete" },
];

function MyOrders() {
  const [statusFilter, setStatusFilter] = useState(options[0]?.value);
  const router = useRouter();
  const { payment_intent: paymentIntentId } = router.query;
  const { data: paymentIntent, isSuccess } =
    api.stripe.retrivePaymentIntent.useQuery(
      { paymentIntentId },
      { enabled: !!paymentIntentId }
    );

  const orderQuery = api.orders.getBuyerOrders.useQuery();
  const orders = orderQuery.data;

  if (isSuccess && paymentIntent) {
    paymentIntent.status === "succeeded"
      ? toast.success("Payment Completed!", {
          position: toast.POSITION.TOP_LEFT,
        })
      : paymentIntent.status === "processing"
      ? toast.warning("Payment Processing", {
          position: toast.POSITION.TOP_LEFT,
        })
      : paymentIntent.status === "requires_payment_method"
      ? toast.error("Please Try another payment method", {
          position: toast.POSITION.TOP_LEFT,
        })
      : null;
  }

  const handleFilterChange = (value: string) => {
    setStatusFilter(value);
  };

  const checkoutItem = (listing: Listing): void => {
    router
      .push({
        pathname: "/checkout",
        query: { id: listing.id },
      })
      .catch((e) => console.log(e));
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

  //Render
  if (orders && orders.length === 0) {
    return (
      <section className="mx-auto flex w-full flex-col items-center justify-center overflow-hidden">
        <div className="mx-auto my-16 text-center align-middle text-xl text-white">
          <span
            className="cursor-pointer text-[#FF5500] underline underline-offset-4"
            onClick={() => router.push("/").catch((err) => console.log(err))}
          >
            Let's go shopping!
          </span>
        </div>
      </section>
    );
  }
  if (orders && orders.length !== 0) {
    return (
      <>
        <div className="mx-2 flex flex-col text-white md:mx-auto md:w-2/3 ">
          <div className="  flex justify-end text-white ">
            <DropdownMenu.Root>
              <DropdownMenu.Trigger className="text-md my-4  mr-12 inline border-b-2 border-gray-700 p-1 outline-none md:text-lg">
                Filter by Status: {""}
                {options.find((option) => option.value === statusFilter)?.label}
              </DropdownMenu.Trigger>
              <DropdownMenu.Content className="m-0 w-44 rounded-2xl bg-black px-1 font-sans text-sm text-white md:text-lg">
                {options.map((option) => (
                  <DropdownMenu.Item
                    key={option.value}
                    onSelect={() => handleFilterChange(option.value)}
                    className="cursor-pointer rounded border-b border-t border-gray-700 py-2 text-center font-sans outline-none hover:bg-gray-800 hover:text-white"
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
                </tr>
              </thead>
              <tbody>
                {applyStatusFilter()?.map((order) => {
                  const listing = order.Listings[0];
                  const album = listing?.album;
                  return (
                    <tr key={order.id} className="border-b border-gray-900">
                      <td className="flex flex-col items-center justify-center p-3">
                        {album ? (
                          <>
                            <img
                              src={album.artwork}
                              alt={album.name}
                              className="h-12 w-12 rounded object-cover"
                            />
                            <div className="ml-2 p-3 font-sans text-xs md:text-base">
                              {album.name}
                            </div>
                          </>
                        ) : (
                          <div>No image available</div>
                        )}
                      </td>

                      <td className="ml-2 p-3 font-sans text-xs md:text-xs lg:text-base">
                        <b>Condition: </b> {listing?.condition || "N/A"} <br />
                        <b>Format: </b> {listing?.format || "N/A"} <br />
                        <b>Speed: </b> {listing?.speed || "N/A"} <br />
                        <b>Weight: </b> {listing?.weight || "N/A"}
                        <br />
                      </td>
                      <td className="lg:text-md ml-2 p-3 font-sans text-xs md:text-base">
                        {listing?.description || "N/A"}
                      </td>
                      <td className="lg:text-md ml-2 p-3 font-sans text-xs md:text-base">
                        {listing?.price || "N/A"}{" "}
                        {(listing?.currency || "N/A").toUpperCase()}
                      </td>
                      <td className="lg:text-md ml-2 p-3 font-sans text-xs md:text-base">
                        {order.status === "Awaiting Payment" ? (
                          <button
                            className={`lg:text-md   flex flex-col items-center  bg-white p-2  text-xs text-black hover:bg-[#FF5500] hover:text-white md:text-base ${serif.className}`}
                            onClick={() => checkoutItem(listing)}
                          >
                            {order.status}
                          </button>
                        ) : (
                          <>{order.status}</>
                        )}
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

export default MyOrders;
