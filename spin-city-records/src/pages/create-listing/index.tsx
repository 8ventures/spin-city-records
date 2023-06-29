import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import { useRouter } from "next/router";
import { RouterOutputs, api } from "~/utils/api";

const CreateListingPage = () => {
  const [form, setForm] = useState({
    price: 0,
    currency: "",
    weight: "",
    format: "",
    description: "",
    edition: "",
    condition: "",
  });
  const { user } = useUser();
  const createListingMutation = api.listings.create.useMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value =
      e.target.name === "price" ? Number(e.target.value) : e.target.value;
    setForm({
      ...form,
      [e.target.name]: value,
    });
  };
  console.log({ form });
  console.log({ user });

  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createListingMutation.mutate(form);
      // Reset form after submission
      setForm({
        price: 0,
        currency: "",
        weight: "",
        format: "",
        description: "",
        edition: "",
        condition: "",
      });
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <input
        type="number"
        name="price"
        placeholder="price"
        className="block rounded-lg border border-gray-300 bg-gray-300"
        onChange={handleChange}
        value={form.price}
      />
      <input
        type="text"
        name="currency"
        placeholder="currency"
        className="rounded-lg border border-gray-300 bg-gray-200"
        onChange={handleChange}
        value={form.currency}
      />
      <input
        type="text"
        name="weight"
        placeholder="weight"
        className="rounded-lg border border-gray-300 bg-gray-200"
        onChange={handleChange}
        value={form.weight}
      />
      <input
        type="text"
        name="format"
        placeholder="format"
        className="rounded-lg border border-gray-300 bg-gray-200"
        onChange={handleChange}
        value={form.format}
      />
      <input
        type="text"
        name="description"
        placeholder="description"
        className="rounded-lg border border-gray-300 bg-gray-200"
        onChange={handleChange}
        value={form.description}
      />
      <input
        type="text"
        name="condition"
        placeholder="condition"
        className="rounded-lg border border-gray-300 bg-gray-200"
        onChange={handleChange}
        value={form.condition}
      />
      <input
        type="text"
        name="edition"
        placeholder="condition"
        className="rounded-lg border border-gray-300 bg-gray-200"
        onChange={handleChange}
        value={form.edition}
      />
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
