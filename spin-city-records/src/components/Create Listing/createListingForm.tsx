import { api } from "~/utils/api";
import SearchAlbumsForm from "~/components/Create Listing/SearchAlbumsForm";
import SelectSpeed from "./selectSpeed";
import SelectWeight from "./selectWeight";
import SelectFormat from "./selectFormat";
import SelectCondition from "./selectCondition";
import SelectCurrency from "./selectCurrency";
import SelectEdition from "./selectEdition";
import Skeleton from "../skeleton";
import { z } from "zod";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/router";
import Spinner from "../../components/spinner";
import { useUser } from "@clerk/nextjs";
import { toast } from "react-toastify";
const validationSchema = z.object({
  album: z.object({
    artistId: z.string(),
    artwork: z.string(),
    createdAt: z.date(),
    id: z.string(),
    label: z.string(),
    name: z.string(),
    updatedAt: z.date(),
    year: z.number(),
  }),
  price: z.number(),
  currency: z.string(),
  speed: z.string(),
  weight: z.string(),
  format: z.string(),
  condition: z.string(),
  editions: z
    .object({
      value: z.string(),
    })
    .array(),
  description: z.string(),
});

type ValidationSchema = z.infer<typeof validationSchema>;

export default function CreateListingForm() {
  const router = useRouter();
  const { user } = useUser();
  //console.log( user )

  const currentUserId = user?.id;
  const sellerCheck = api.sellers.checkIfSeller.useQuery({
    clerkId: currentUserId || "",
  });
  console.log(sellerCheck);

  const {
    mutate: createListing,
    isSuccess,
    isLoading: isListingLoading,
  } = api.listings.createListing.useMutation();

  const {
    data: editions,
    isLoading: isEditionsLoading,
    isError,
  } = api.editions.getAll.useQuery();

  const { register, handleSubmit, control } = useForm<ValidationSchema>({});
  const { fields, append, remove } = useFieldArray({
    control,
    name: "editions",
  });

  if (isSuccess) {
    router.push("/profile/selling").catch((e) => console.log(e));
  }

  const onSubmit = (e: ValidationSchema) => {
    if (!sellerCheck.data) {
      toast.error(
        "You need to become a seller firstly to create new listings!",
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "dark",
        }
      );
      return;
    }
    try {
      //console.log(e)
      createListing(e);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {isEditionsLoading ? (
        <Skeleton />
      ) : isError ? (
        <div>Error Loading form</div>
      ) : (
        <div className="flex items-center justify-center rounded-xl">
          <form
            className="flex flex-col rounded-xl p-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <label className="my-2 text-xl text-custom-orange">
              Select Album
            </label>
            <Controller
              name="album"
              control={control}
              render={({ field }) => {
                return <SearchAlbumsForm ref={field.ref} field={field} />;
              }}
            />
            <label className="my-2 mt-7 text-xl text-custom-orange">
              Set Price
            </label>
            <div className="flex space-x-10">
              <div className="flex flex-col">
                <input
                  type="number"
                  className="rounded-xl border border-gray-600 bg-inherit px-4 py-2 text-white focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-600"
                  {...register("price", { valueAsNumber: true })}
                  step={0.01}
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
            <label className="my-2 mt-7 text-xl text-custom-orange">
              Set Album Features
            </label>
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
                render={({ field, fieldState }) => {
                  console.log(fieldState);
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
            <label className="my-2 mt-7 text-xl text-custom-orange">
              Set Album Editions
            </label>
            <div className="flex space-x-2">
              <Controller
                name={`editions.${0}.value`}
                control={control}
                render={({ field }) => {
                  return (
                    <SelectEdition field={field} editions={editions || []} />
                  );
                }}
              />
              {fields.slice(1).map((field, index) => (
                <Controller
                  key={field.id}
                  name={`editions.${index + 1}.value` as const}
                  control={control}
                  render={({ field }) => {
                    return (
                      <SelectEdition field={field} editions={editions || []} />
                    );
                  }}
                />
              ))}
              <button
                type="button"
                onClick={() => append({ value: "1" })}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-black "
              >
                <PlusIcon className="ml-1 h-5 w-5 text-custom-orange" />
              </button>
              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => remove(fields.length - 1)}
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-black "
                >
                  <MinusIcon className="ml-1 h-5 w-5 text-custom-orange" />
                </button>
              )}
            </div>
            <label className="my-2 mt-7 text-xl text-custom-orange">
              Add Description
            </label>
            <input
              type="text"
              placeholder="e.g. Plays great!"
              className="rounded-xl border border-gray-600 bg-inherit px-4 py-2 text-white focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-600"
              {...register("description")}
            />
            <div className="flex justify-center align-middle">
              {isListingLoading || isSuccess ? (
                <Spinner />
              ) : (
                <button
                  className="mt-8 w-2/4 rounded-xl bg-custom-orange px-4 py-2 text-xl text-white"
                  type="submit"
                >
                  Create Listing
                </button>
              )}
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
