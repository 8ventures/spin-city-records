import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import { RouterOutputs, api } from "~/utils/api";

const CreateListingPage = () => {
  const [form, setForm] = useState({
    price: 0,
    currency: '',
    weight: '',
    format: '',
    description: '',
    condition: '',
    albumName: '',
    albumLabel: '',
    albumArtwork: '',
    albumYear: 0,
    albumDuration: 0,
    artistName: '',
    artistBio: '',
    artistPicture: '',
  });

  const { user } = useUser();
  const createListingMutation = api.listings.create.useMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createListingMutation.mutate(form);
      // Reset form after successful submission
      setForm({
        price: 0,
        currency: '',
        weight: '',
        format: '',
        description: '',
        condition: '',
        albumName: '',
        albumLabel: '',
        albumArtwork: '',
        albumYear: 0,
        albumDuration: 0,
        artistName: '',
        artistBio: '',
        artistPicture: '',
      });
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };


  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <input
        type="number"
        name="price"
        placeholder="price"
        onChange={handleChange}
        value={form.price}
      />
      <input
        type="text"
        name="currency"
        placeholder="currency"
        onChange={handleChange}
        value={form.currency}
      />
      <input
        type="text"
        name="weight"
        placeholder="weight"
        onChange={handleChange}
        value={form.weight}
      />
      <input
        type="text"
        name="format"
        placeholder="format"
        onChange={handleChange}
        value={form.format}
      />
      <input
        type="text"
        name="description"
        placeholder="description"
        onChange={handleChange}
        value={form.description}
      />
      <input
        type="text"
        name="condition"
        placeholder="condition"
        onChange={handleChange}
        value={form.condition}
      />
      <input
        type="text"
        name="albumName"
        placeholder="album name"
        onChange={handleChange}
        value={form.albumName}
      />
      <input
        type="text"
        name="albumLabel"
        placeholder="album label"
        onChange={handleChange}
        value={form.albumLabel}
      />
      <input
        type="text"
        name="albumArtwork"
        placeholder="album artwork string"
        onChange={handleChange}
        value={form.albumArtwork}
      />
      <input
        type="number"
        name="albumYear"
        placeholder="album year"
        onChange={handleChange}
        value={form.albumYear}
      />
      <input
        type="number"
        name="albumDuration"
        placeholder="album duration"
        onChange={handleChange}
        value={form.albumDuration}
      />
      <input
        type="text"
        name="artistName"
        placeholder="artist name"
        onChange={handleChange}
        value={form.artistName}
      />
      <input
        type="text"
        name="artistBio"
        placeholder="artist bio"
        onChange={handleChange}
        value={form.artistBio}
      />
      <input
        type="text"
        name="artistPicture"
        placeholder="artist picture string"
        onChange={handleChange}
        value={form.artistPicture}
      />
      <button type="submit">Create Listing</button>
    </form>
  );
};
export default CreateListingPage;
