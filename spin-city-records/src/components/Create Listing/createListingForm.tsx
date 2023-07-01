import { useState } from "react";
import { api } from "~/utils/api";
import SearchAlbumsForm from "~/components/SearchAlbumsForm";
import { Select } from '@radix-ui/react-select';
import SelectSpeed from "./selectSpeed";
import SelectWeight from "./selectWeight";
import SelectFormat from "./selectFormat";
import SelectConditon from "./selectCondition";

export default function CreateListingForm () {
  
  const { data: editions, error} = api.editions.getAll.useQuery();

  const { mutate: createListing } = api.listings.create.useMutation();


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


  if (error) {
    console.error(error);
    return <div>Error loading editions</div>;
  }

  if (!editions) {
    return <div>Loading...</div>;
  }

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
    <div className="flex flex-col rounded-xl ">
      <form className="flex flex-col p-4 rounded-xl" onSubmit={handleSubmit}>
        <label className="my-2 text-xl text-white" >
          Select Album
        </label>
        <SearchAlbumsForm setForm={setForm}/>
        <div className="flex space-x-10">
          <div className="flex flex-col">
            <label className="my-2 text-xl text-white" >
              Set Price
            </label>
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
          <div className="flex flex-col">
            <label className="my-2 text-xl text-white" >
              Select Currency
            </label>
            <input
              type="text"
              required
              name="currency"
              placeholder="Currency"
              className="rounded-lg border border-gray-300 bg-inherit text-white py-2 px-4"
              onChange={handleChange}
              value={form.currency}
            />
          </div>
        </div>
        <div className="flex space-x-10 my-2">
          <SelectSpeed/>
          <SelectWeight/>
          <SelectFormat/>
          <SelectConditon/>
        </div>
          <input
            type="text"
            name="condition"
            required
            placeholder="Condition"
            className="rounded-lg border border-gray-300 bg-gray-700 text-white py-2 px-4"
            onChange={handleChange}
            value={form.condition}
          />
        <label className="my-2 text-xl text-white" >
          Add Description
        </label>
        <input
          type="text"
          name="description"
          required
          placeholder="Description"
          className="rounded-lg border border-gray-300 bg-inherit text-white py-2 px-4"
          onChange={handleChange}
          value={form.description}
        />
        <div className="flex space-x-4 flex-wrap my-2 text-white">
          {editions.map((edition) => (
            <label key={edition.id} className="flex items-center">
              <input
                type="checkbox"
                name="edition"
                value={edition.type}
                onChange={(e) => {
                  const checked = e.target.checked;
                  setForm((prevForm) => {
                    const alreadySelected = prevForm.edition.find((ed) => ed.type === edition.type);
                    if (checked && !alreadySelected) {
                      // Add the checked edition
                      return { ...prevForm, edition: [...prevForm.edition, { type: edition.type }] };
                    } else if (!checked && alreadySelected) {
                      // Remove the unchecked edition
                      return { ...prevForm, edition: prevForm.edition.filter((ed) => ed.type !== edition.type) };
                    }
                    return prevForm;
                  });
                }}
                className="mr-2 rounded border-gray-300 focus:ring-primary-500 h-6 w-6"
              />
              <span>{edition.type}</span>
            </label>
          ))}
        </div>
      <button className="rounded-lg border border-gray-900 bg-gray-300 text-gray-900 py-2 px-4" type="submit">
        Create Listing
      </button>
    </form>

    </div>
  )
}