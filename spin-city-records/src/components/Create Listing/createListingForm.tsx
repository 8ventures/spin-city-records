import { useState } from "react";
import { api } from "~/utils/api";
import SearchAlbumsForm from "~/components/SearchAlbumsForm";
import { Select } from '@radix-ui/react-select';
import SelectSpeed from "./selectSpeed";
import SelectWeight from "./selectWeight";
import SelectFormat from "./selectFormat";
import SelectConditon from "./selectCondition";
import SelectCurrency from "./selectCurrency";
import SelectEdition from "./selectEdition";
import Skeleton from "../skeleton";

export default function CreateListingForm () {

  const { mutate: createListing } = api.listings.create.useMutation();

  const { data: editions, isLoading, isError } = api.editions.getAll.useQuery();


  const [form, setForm] = useState({
    price: 0,
    currency: "",
    weight: "",
    format: "",
    speed: "",
    description: "",
    edition: [{ type: "" }],
    condition: "",
    // sellerId: "",
    albumId: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value =
      e.target.name === "price" ? Number(e.target.value) : e.target.value;
    setForm({
      ...form,
      [e.target.name]: value,
    });
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // try {
    //   createListingMutation.mutate(form);
    //   console.log({ form });
    //   // Reset form after submission
    //   setForm({
    //     price: 0,
    //     currency: "",
    //     weight: "",
    //     format: "",
    //     speed: "",
    //     description: "",
    //     edition: [{ type: "" }],
    //     condition: "",
    //     // sellerId: "",
    //     albumId: "",
    //   });
    //   //router.push("/");
    // } catch (error) {
    //   console.error(error);
    // }
  };

  return (
    <div>
      {isLoading ? (
        <Skeleton />
      ) : isError ? (
        <div>Error Loading form</div>
      ) : (
        <div className="flex flex-col rounded-xl">
          <form className="flex flex-col p-4 rounded-xl" onSubmit={handleSubmit}>
            <label className="my-2 text-xl text-white">Select Album</label>
            <SearchAlbumsForm setForm={setForm} />
            <label className="my-2 text-xl text-white">Set Price</label>
            <div className="flex space-x-10">
              <div className="flex flex-col">
                <input
                  type="number"
                  name="price"
                  required
                  placeholder="Price"
                  className="rounded-xl border border-gray-300 bg-inherit text-white py-2 px-4"
                  onChange={handleChange}
                  value={form.price}
                />
              </div>
              <SelectCurrency />
            </div>
            <label className="my-2 text-xl text-white">Select Album Features</label>
            <div className="flex space-x-10">
              <SelectSpeed />
              <SelectWeight />
              <SelectFormat />
              <SelectConditon />
            </div>
            <label className="my-2 text-xl text-white">Select Album Edtion</label>
            <SelectEdition editions={editions || []} />
            <label className="my-2 text-xl text-white">Add Description</label>
            <input
              type="text"
              name="description"
              required
              placeholder="e.g. Looking for a new home!"
              className="rounded-xl text-xl border border-gray-300 bg-inherit text-white py-2 px-4"
              onChange={handleChange}
              value={form.description}
            />
            <button className="rounded-xl bg-white text-black text-xl py-2 px-4 mt-2" type="submit">
              Create Listing
            </button>
          </form>
        </div>
      )}
    </div>
  )
}
  