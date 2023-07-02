import { useState } from "react";
import { api } from "~/utils/api";
import SearchAlbumsForm from "~/components/Create Listing/SearchAlbumsForm";
import SelectSpeed from "./selectSpeed";
import SelectWeight from "./selectWeight";
import SelectFormat from "./selectFormat";
import SelectCondition from "./selectCondition";
import SelectCurrency from "./selectCurrency";
import SelectEdition from "./selectEdition";
import Skeleton from "../skeleton";
import { z } from 'zod';
import { SubmitHandler, useForm, Controller, useFormState, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/router";
import Spinner from '../../components/spinner'

const validationSchema = z.object({
  albumId: z.string(),
  price: z.number(),
  currency: z.string(),
  speed: z.string(),
  weight: z.string(),
  format: z.string(),
  condition: z.string(),
  editions: z.object({
    value: z.string()
  }).array(),
  description: z.string(),
})

type ValidationSchema = z.infer<typeof validationSchema>;


export default function CreateListingForm () {
  
  const router = useRouter();

  const { mutate: createListing, isSuccess, isLoading: isListingLoading } = api.listings.create.useMutation();
  
  const { data: editions, isLoading: isEditionsLoading, isError } = api.editions.getAll.useQuery();
  
  const {register, handleSubmit, control,} = useForm<ValidationSchema>({});
  const {fields, append, remove } = useFieldArray({
    control,
    name: 'editions'
  });

  if (isSuccess) {
    router.push('http://localhost:3000/profile/user_2RmYnqMfglB4HTLO9IUfhERAJWK')
      .catch((e) => console.log(e))
  }
  
  
  const onSubmit = (e) => {
    console.log(e)
    // createListing(e)
  }

  return (
    <div>
      {isEditionsLoading ? (
        <Skeleton />
      ) : isError ? (
        <div>Error Loading form</div>
      ) : (
        <div className="flex flex-col rounded-xl">
          <form className="flex flex-col p-4 rounded-xl" onSubmit={handleSubmit(onSubmit)}>
            <label className="my-2 text-xl text-white">Select Album</label>
            <Controller
                name="albumId"
                control={control}
                render={({ field }) => {
                  return <SearchAlbumsForm ref={field.ref} field={field} />;
                }}
              />
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
                  return <SelectCurrency ref={field.ref} field={field} />;
                }}
              />
            </div>
            <label className="my-2 text-xl text-white">Select Album Features</label>
            <div className="flex space-x-10">
              <Controller
                name="speed"
                control={control}
                render={({ field }) => {
                  return <SelectSpeed ref={field.ref} field={field} />;
                }}
              />
              <Controller
                name="weight"
                control={control}
                render={({ field }) => {
                  return <SelectWeight ref={field.ref} field={field} />;
                }}
              />
              <Controller
                name="format"
                control={control}
                render={({ field, fieldState}) => {
                  console.log(fieldState)
                  return <SelectFormat ref={field.ref} field={field} />;
                }}
              />
              <Controller
                name="condition"
                control={control}
                render={({ field }) => {
                  return <SelectCondition ref={field.ref} field={field} />;
                }}
              />
            </div>
            <label className="my-2 text-xl text-white">Select Album Edition</label>
            <div className="flex space-x-2">
            <Controller
              name={`editions.${0}.value`}
              control={control}
              render={({ field }) => {
                return <SelectEdition field={field} editions={editions || []} />;
              }}
              />
            {fields.slice(1).map((field, index) => (
              <Controller
              key={field.id}
              name={`editions.${index + 1}.value` as const}
              control={control}
              render={({ field }) => {
                return <SelectEdition field={field} editions={editions || []} />;
              }}
              />
            ))}
            <button
              type="button"
              onClick={() => append({value: '1'})}
              className="flex items-center justify-center h-9 w-9 bg-white rounded-xl "
            >
              <PlusIcon className=" text-black h-8 w-8"/>
            </button>
            {fields.length > 1 && 
            <button
              type="button"
              onClick={() => remove(fields.length -1 )}
              className="flex items-center justify-center h-9 w-9 bg-white rounded-xl "
            >
              <MinusIcon className=" text-black h-8 w-8"/>
            </button>
            }
            </div>
            <label className="my-2 text-xl text-white">Add Description</label>
            <input
              type="text"
              placeholder="e.g. Looking for a new home!"
              className="rounded-xl text-xl border border-gray-300 bg-inherit text-white py-2 px-4"
              {...register("description")}
            />
            {isListingLoading || isSuccess? (
              <Spinner/>
                ) : (
                <button className="rounded-xl bg-white text-black text-xl py-2 px-4 mt-2" type="submit">
                  Create Listing
                </button>
              )
            }
          </form>
        </div>
      )}
    </div>
  );
}