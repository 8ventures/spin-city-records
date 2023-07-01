import { useState } from "react";
import { api } from "~/utils/api";
import SearchAlbumsForm from "~/components/SearchAlbumsForm";
import SelectSpeed from "./selectSpeed";
import SelectWeight from "./selectWeight";
import SelectFormat from "./selectFormat";
import SelectCondition from "./selectCondition";
import SelectCurrency from "./selectCurrency";
import SelectEdition from "./selectEdition";
import Skeleton from "../skeleton";
import { z } from 'zod';
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const validationSchema = z.object({
  albumId: z.string(),
  price: z.number(),
  currency: z.string(),
  speed: z.string(),
  weight: z.string(),
  format: z.string(),
  condition: z.string(),
  editions: z.string(),
  description: z.string(),
})

type ValidationSchema = z.infer<typeof validationSchema>;

export default function CreateListingForm () {

  const { mutate: createListing } = api.listings.create.useMutation();

  const { data: editions, isLoading, isError } = api.editions.getAll.useQuery();

  const {register, handleSubmit, control} = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<ValidationSchema> = (data: ValidationSchema) => console.log(data);

  return (
    <div>
      {isLoading ? (
        <Skeleton />
      ) : isError ? (
        <div>Error Loading form</div>
      ) : (
        <div className="flex flex-col rounded-xl">
          <form className="flex flex-col p-4 rounded-xl" onSubmit={handleSubmit(onSubmit)}>
            <label className="my-2 text-xl text-white">Select Album</label>
            {/* <SearchAlbumsForm setForm={setForm} /> */}
            <label className="my-2 text-xl text-white">Set Price</label>
            <div className="flex space-x-10">
              <div className="flex flex-col">
                <input
                  type="number"
                  className="rounded-xl border border-gray-300 bg-inherit text-white py-2 px-4"
                  {...register("price")}
                />
              </div>
              <Controller
                name="currency"
                control={control}
                render={({ field }) => {
                  return <SelectCurrency field={field} />;
                }}
              />
            </div>
            <label className="my-2 text-xl text-white">Select Album Features</label>
            <div className="flex space-x-10">
              <Controller
                name="speed"
                control={control}
                render={({ field }) => {
                  return <SelectSpeed field={field} />;
                }}
              />
              <Controller
                name="weight"
                control={control}
                render={({ field }) => {
                  return <SelectWeight field={field} />;
                }}
              />
              <Controller
                name="format"
                control={control}
                render={({ field }) => {
                  return <SelectFormat field={field} />;
                }}
              />
              <Controller
                name="condition"
                control={control}
                render={({ field }) => {
                  return <SelectCondition field={field} />;
                }}
              />
            </div>
            <label className="my-2 text-xl text-white">Select Album Edition</label>
            <Controller
                name="editions"
                control={control}
                render={({ field }) => {
                  return <SelectEdition field={field} editions={editions || []} />;
                }}
              />
            <label className="my-2 text-xl text-white">Add Description</label>
            <input
              type="text"
              placeholder="e.g. Looking for a new home!"
              className="rounded-xl text-xl border border-gray-300 bg-inherit text-white py-2 px-4"
              {...register("description")}
            />
            <button className="rounded-xl bg-white text-black text-xl py-2 px-4 mt-2" type="submit">
              Create Listing
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
    
  
  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   // try {
  //   //   createListingMutation.mutate(form);
  //   //   console.log({ form });
  //   //   // Reset form after submission
  //   //   setForm({
  //   //     price: 0,
  //   //     currency: "",
  //   //     weight: "",
  //   //     format: "",
  //   //     speed: "",
  //   //     description: "",
  //   //     edition: [{ type: "" }],
  //   //     condition: "",
  //   //     // sellerId: "",
  //   //     albumId: "",
  //   //   });
  //   //   //router.push("/");
  //   // } catch (error) {
  //   //   console.error(error);
  //   // }
  // };
