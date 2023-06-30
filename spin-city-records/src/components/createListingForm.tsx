import { useState } from "react";
import { api } from "~/utils/api";
import SearchAlbumsForm from "~/components/SearchAlbumsForm";

export default function CreateListingForm () {

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

  const { data: editions, error } = api.editions.getAll.useQuery();

  const createListingMutation = api.listings.create.useMutation();

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
    <div className=" ">
      <form className="flex flex-col gap-3 bg-gray-800 p-4 rounded-lg" onSubmit={handleSubmit}>
        <SearchAlbumsForm setForm={setForm}/>
        <input
          type="number"
          name="price"
          required
          placeholder="Price"
          className="rounded-lg border border-gray-300 bg-gray-700 text-white py-2 px-4"
          onChange={handleChange}
          value={form.price}
        />
        <input
          type="text"
          required
          name="currency"
          placeholder="Currency"
          className="rounded-lg border border-gray-300 bg-gray-700 text-white py-2 px-4"
          onChange={handleChange}
          value={form.currency}
        />
        <input
          type="text"
          required
          name="speed"
          placeholder="Speed"
          className="rounded-lg border border-gray-300 bg-gray-700 text-white py-2 px-4"
          onChange={handleChange}
          value={form.speed}
        />
        <input
          type="text"
          name="weight"
          required
          placeholder="Weight"
          className="rounded-lg border border-gray-300 bg-gray-700 text-white py-2 px-4"
          onChange={handleChange}
          value={form.weight}
        />
        <input
          type="text"
          name="format"
          required
          placeholder="Format"
          className="rounded-lg border border-gray-300 bg-gray-700 text-white py-2 px-4"
          onChange={handleChange}
          value={form.format}
        />
        <input
          type="text"
          name="description"
          required
          placeholder="Description"
          className="rounded-lg border border-gray-300 bg-gray-700 text-white py-2 px-4"
          onChange={handleChange}
          value={form.description}
        />
        <input
          type="text"
          name="condition"
          required
          placeholder="Condition"
          className="rounded-lg border border-gray-300 bg-gray-700 text-white py-2 px-4"
          onChange={handleChange}
          value={form.condition}
        />
        <div className="flex space-x-4 flex-wrap text-white">
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