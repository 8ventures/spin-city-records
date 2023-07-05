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
import { zodResolver} from '@hookform/resolvers/zod'
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/router";
import Spinner from '../../components/spinner'
import { useUser } from "@clerk/nextjs";
import {toast } from "react-toastify";
import { serif, sans } from "~/utils/fonts";

const requiredError ={required_error: 'This field is required'}

const validationSchema = z.object({
  album: z.object({
    artistId: z.string(),
    artwork: z.string(),
    createdAt: z.date(),
    id: z.string(),
    label: z.string(),
    name: z.string(),
    updatedAt: z.date(),
    year: z.number()
  }),
  price: z.number().gt(1, {message: "Price must be at least 1 of your local currency"}),
  currency: z.string(requiredError),
  speed: z.string(requiredError),
  weight: z.string(requiredError),
  format: z.string(requiredError),
  condition: z.string(requiredError),
  editions: z.object({
    value: z.string()
  }).array().min(1, {message: 'Must choose at leasst on edtion type'}),
  description: z.string().min(5, { message: "Must be at least 5 character long" }),
})

type ValidationSchema = z.infer<typeof validationSchema>;


export default function CreateListingForm () {

  const router = useRouter();
  const { user } = useUser();
  //console.log( user )

  const currentUserId = user?.id;
  const sellerCheck = api.sellers.checkIfSeller.useQuery({
    clerkId: currentUserId || "",
  });
    console.log(sellerCheck)

  const { mutate: createListing, isSuccess, isLoading: isListingLoading } = api.listings.createListing.useMutation();

  const { data: editions, isLoading: isEditionsLoading, isError } = api.editions.getAll.useQuery();

  const {register, handleSubmit, control, formState: {errors} } = useForm<ValidationSchema>({resolver: zodResolver(validationSchema)});
  const {fields, append, remove } = useFieldArray({
    control,
    name: 'editions'
  });

  if (isSuccess) {
    router.push('/profile/selling')
      .catch((e) => console.log(e))
  }

  const onSubmit = (e: ValidationSchema) => {
    if (!sellerCheck.data) {
      toast.error('You need to become a seller firstly to create new listings!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "dark",
        });
      return
    }
    try {
      //console.log(e)
      createListing(e)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      {isEditionsLoading ? (
        <Skeleton />
      ) : isError ? (
        <div>Error Loading form</div>
      ) : (
        <div className="flex justify-center items-center rounded-xl">
          <form className="flex flex-col md:w-2/5 sm:3-4 p-4 rounded-xl text-white" onSubmit={handleSubmit(onSubmit)}>
            {/* <label className="my-2 text-xl">Select Album</label> */}
            <Controller
                name="album"
                control={control}
                render={({ field }) => {
                  return <SearchAlbumsForm ref={field.ref} field={field} />;
                }}
              />
            <label className="my-2 text-xl mt-7">Set Price</label>
            <div className="flex space-x-10 flex-wrap justify-center ">
              <div className="flex flex-col">
                <div className="flex flex-col items-center">
                <input
                  type="number"
                  className="rounded-xl border border-gray-600 bg-inherit text-white py-2 px-4 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                  {...register("price", {valueAsNumber: true}) }
                  step={0.01}
                />
                {errors.price && (
                <p className="text-md text-red-500 mt-2"> {errors.price.message}
                </p>
                )}
              </div>
              </div>
              <div className="flex flex-col items-center">
                <Controller
                  name="currency"
                  control={control}
                  render={({ field }) => {
                    return <SelectCurrency ref={field.ref} field={field} />;
                  }}
                />
                {errors.currency && (
                <p className="text-md text-red-500 mt-2"> {errors.currency.message}
                </p>
                )}
              </div>
            </div>
            <label className="my-2 text-xl mt-7">Set Album Features</label>
            <div className="grid md:grid-cols-2 grid-cols-1">
              <div className="flex flex-col items-center">
                <Controller
                  name="speed"
                  control={control}
                  render={({ field }) => {
                    return <SelectSpeed ref={field.ref} field={field} />;
                  }}
                />
                {errors.speed && (
                <p className="text-md text-red-500 mt-2"> {errors.speed.message}
                </p>
                )}
              </div>
              <div className="flex flex-col items-center">
                <Controller
                  name="weight"
                  control={control}
                  render={({ field }) => {
                    return <SelectWeight ref={field.ref} field={field} />;
                  }}
                />
                {errors.weight && (
                <p className="text-md text-red-500 mt-2"> {errors.weight.message}
                </p>
                )}
              </div>
              <div className="flex flex-col items-center">
                <Controller
                  name="format"
                  control={control}
                  render={({ field, fieldState}) => {
                    console.log(fieldState)
                    return <SelectFormat ref={field.ref} field={field} />;
                  }}
                />
                {errors.format && (
                <p className="text-md text-red-500 mt-2"> {errors.format.message}
                </p>
                )}
              </div>
              <div className="flex flex-col items-center">
                <Controller
                  name="condition"
                  control={control}
                  render={({ field }) => {
                    return <SelectCondition ref={field.ref} field={field} />;
                  }}
                />
                {errors.condition && (
                <p className="text-md text-red-500 mt-2"> {errors.condition.message}
                </p>
                )}
              </div>
            </div>
            <label className="my-2 text-xl mt-7">Set Album Editions</label>
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
              className="flex items-center justify-center h-9 w-9 bg-black rounded-xl "
            >
              <PlusIcon className=" h-5 w-5 ml-1"/>
            </button>
            {fields.length > 1 &&
            <button
              type="button"
              onClick={() => remove(fields.length -1 )}
              className="flex items-center justify-center h-9 w-9 bg-black rounded-xl "
            >
              <MinusIcon className=" h-5 w-5 ml-1"/>
            </button>
            }
            {errors.editions && (
              <p className="text-md text-red-500 mt-2"> {errors.editions.message}
              </p>
            )}   
            </div>
            <label className="my-2 text-xl mt-7">Add Description</label>
            <input
              type="text"
              placeholder="e.g. Plays great!"
              className="rounded-xl border border-gray-600 bg-inherit text-white py-2 px-4 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
              {...register("description")}
            />
            {errors.description && (
              <p className="text-md text-red-500 mt-2"> {errors.description.message}
              </p>
            )}          
            <div className="flex justify-center align-middle">

            {isListingLoading || isSuccess? (
              <Spinner/>
                ) : (
                <button className={` ${serif.className} bg-[#FF5500] text-white hover:bg-white hover:text-black text-xl py-2 px-4 mt-8 w-2/4`} type="submit">
                  Create Listing
                </button>
              )
            }
            </div>
          </form>
        </div>
      )}
    </div>
  );
}