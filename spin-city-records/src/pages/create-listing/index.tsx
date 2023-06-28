import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import { useRouter } from "next/router";
import { RouterOutputs, api } from "~/utils/api";

const CreateListingPage = () => {
  const { user } = useUser();
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
    albumId: "cljfsjjhp0001uaecu3329kku",
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
        albumId: "cljfsjjhp0001uaecu3329kku",
      });
      //router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <input
        type="number"
        name="price"
        required
        placeholder="price"
        className="block rounded-lg border border-gray-300 bg-gray-300"
        onChange={handleChange}
        value={form.price}
      />
      <input
        type="text"
        required
        name="currency"
        placeholder="currency"
        className="rounded-lg border border-gray-300 bg-gray-200"
        onChange={handleChange}
        value={form.currency}
      />
      <input
        type="text"
        required
        name="speed"
        placeholder="speed"
        className="rounded-lg border border-gray-300 bg-gray-200"
        onChange={handleChange}
        value={form.speed}
      />
      <input
        type="text"
        name="weight"
        required
        placeholder="weight"
        className="rounded-lg border border-gray-300 bg-gray-200"
        onChange={handleChange}
        value={form.weight}
      />
      <input
        type="text"
        name="format"
        required
        placeholder="format"
        className="rounded-lg border border-gray-300 bg-gray-200"
        onChange={handleChange}
        value={form.format}
      />
      <input
        type="text"
        name="description"
        required
        placeholder="description"
        className="rounded-lg border border-gray-300 bg-gray-200"
        onChange={handleChange}
        value={form.description}
      />
      <input
        type="text"
        name="condition"
        required
        placeholder="condition"
        className="rounded-lg border border-gray-300 bg-gray-200"
        onChange={handleChange}
        value={form.condition}
      />
      <select
        name="edition"
        required
        multiple
        className="rounded-lg border border-gray-300 bg-gray-200"
        onChange={(e) => {
          const selectedOptions = Array.from(e.target.selectedOptions).map(
            (o) => o.value
          );
          setForm({
            ...form,
            edition: selectedOptions.map((type) => ({ type })),
          });
        }}
      >
        {editions.map((edition) => (
          <option key={edition.id} value={edition.type}>
            {edition.type}
          </option>
        ))}
      </select>
      <button
        className="rounded-lg border border-gray-900 bg-gray-300"
        type="submit"
      >
        Create Listing
      </button>
    </form>
  );
};
export default CreateListingPage;
