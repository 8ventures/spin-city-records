import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import { useRouter } from "next/router";
import { RouterOutputs, api } from "~/utils/api";
import SearchAlbumsForm from "~/components/Create Listing/SearchAlbumsForm";
import Layout from "~/components/Layout/Layout";
const CreateListingPage = () => {
  const { user } = useUser();
  console.log(user);
  const router = useRouter();
  //const userId = user?.id;
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

  //console.log(editions);
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
  //console.log({form})
  //console.log({user})

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createListingMutation.mutate(form);
      console.log({ form });
      // Reset form after submission
      setForm({
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
      //router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <form
        className="flex flex-col gap-3 rounded-lg bg-gray-800 p-4"
        onSubmit={handleSubmit}
      >
        <SearchAlbumsForm setForm={setForm} />
        <input
          type="number"
          name="price"
          required
          placeholder="Price"
          className="rounded-lg border border-gray-300 bg-gray-700 px-4 py-2 text-white"
          onChange={handleChange}
          value={form.price}
        />
        <input
          type="text"
          required
          name="currency"
          placeholder="Currency"
          className="rounded-lg border border-gray-300 bg-gray-700 px-4 py-2 text-white"
          onChange={handleChange}
          value={form.currency}
        />
        <input
          type="text"
          required
          name="speed"
          placeholder="Speed"
          className="rounded-lg border border-gray-300 bg-gray-700 px-4 py-2 text-white"
          onChange={handleChange}
          value={form.speed}
        />
        <input
          type="text"
          name="weight"
          required
          placeholder="Weight"
          className="rounded-lg border border-gray-300 bg-gray-700 px-4 py-2 text-white"
          onChange={handleChange}
          value={form.weight}
        />
        <input
          type="text"
          name="format"
          required
          placeholder="Format"
          className="rounded-lg border border-gray-300 bg-gray-700 px-4 py-2 text-white"
          onChange={handleChange}
          value={form.format}
        />
        <input
          type="text"
          name="description"
          required
          placeholder="Description"
          className="rounded-lg border border-gray-300 bg-gray-700 px-4 py-2 text-white"
          onChange={handleChange}
          value={form.description}
        />
        <input
          type="text"
          name="condition"
          required
          placeholder="Condition"
          className="rounded-lg border border-gray-300 bg-gray-700 px-4 py-2 text-white"
          onChange={handleChange}
          value={form.condition}
        />
        <div className="flex space-x-4 text-white">
          {editions.map((edition) => (
            <label key={edition.id} className="flex items-center">
              <input
                type="checkbox"
                name="edition"
                value={edition.type}
                onChange={(e) => {
                  const checked = e.target.checked;
                  setForm((prevForm) => {
                    const alreadySelected = prevForm.edition.find(
                      (ed) => ed.type === edition.type
                    );
                    if (checked && !alreadySelected) {
                      // Add the checked edition
                      return {
                        ...prevForm,
                        edition: [...prevForm.edition, { type: edition.type }],
                      };
                    } else if (!checked && alreadySelected) {
                      // Remove the unchecked edition
                      return {
                        ...prevForm,
                        edition: prevForm.edition.filter(
                          (ed) => ed.type !== edition.type
                        ),
                      };
                    }
                    return prevForm;
                  });
                }}
                className="focus:ring-primary-500 mr-2 h-6 w-6 rounded border-gray-300"
              />
              <span>{edition.type}</span>
            </label>
          ))}
        </div>

        <button
          className="rounded-lg border border-gray-900 bg-gray-300 px-4 py-2 text-gray-900"
          type="submit"
        >
          Create Listing
        </button>
      </form>
    </Layout>
  );
};
export default CreateListingPage;
