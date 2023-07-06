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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/router";
import Spinner from "../../components/spinner";
import { useUser } from "@clerk/nextjs";
import { toast } from "react-toastify";
import { serif, sans } from "~/utils/fonts";
const requiredError = { required_error: "This field is required" };

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
  price: z
    .number()
    .gt(1, { message: "Price must be at least 1 of your local currency" }),
  currency: z.string(requiredError),
  speed: z.string(requiredError),
  weight: z.string(requiredError),
  format: z.string(requiredError),
  condition: z.string(requiredError),
  editions: z
    .object({
      value: z.string(),
    })
    .array()
    .min(1, { message: "Must choose at leasst on edtion type" }),
  description: z
    .string()
    .min(5, { message: "Must be at least 5 character long" }),
});

type ValidationSchema = z.infer<typeof validationSchema>;

export default function CreateListingForm() {
  const router = useRouter();
  const { user } = useUser();

  const currentUserId = user?.id;
  const sellerCheck = api.sellers.checkIfSeller.useQuery({
    clerkId: currentUserId || "",
  });

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

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ValidationSchema>({ resolver: zodResolver(validationSchema) });
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
    } else {
      toast.success("Listing created successfully!", {
        position: "top-left",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
      });
    }
    try {
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
        <div className="mx-auto flex w-full items-center justify-center md:w-2/3 ">
          <form
            className="flex w-full flex-col rounded-xl p-4 md:w-2/3"
            onSubmit={handleSubmit(onSubmit)}
          >
            <label className="text-md sm:text-md my-2 text-[#ff5500]">
              Select an Album
            </label>
            <Controller
              name="album"
              control={control}
              render={({ field }) => {
                return <SearchAlbumsForm ref={field.ref} field={field} />;
              }}
            />
            <label className="sm:text-md text-md my-2 mt-7 text-[#ff5500]">
              Set Price & Currency
            </label>
            <div className="flex flex-row">
              <input
                type="number"
                className="mr-8 rounded-xl border border-gray-600 bg-inherit px-4 py-2 text-lg text-white focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-600"
                {...register("price", { valueAsNumber: true })}
                step={0.01}
                min={0}
                placeholder="Price"
              />
              <Controller
                name="currency"
                control={control}
                render={({ field }) => {
                  return <SelectCurrency ref={field.ref} field={field} />;
                }}
              />
            </div>
            <label className="sm:text-md text-md my-2 mt-7 text-custom-orange">
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
            <label className="sm:text-md text-md my-2 mt-7 text-custom-orange">
              Set Album Editions
            </label>
            <div className="flex space-x-2">
              <Controller
                name={`editions.${0}.value`}
                control={control}
                render={({ field }) => {
                  return (
                    // @ts-ignore
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
            <label className="sm:text-md text-md my-2 mt-7 text-custom-orange">
              Add Description
            </label>
            <input
              type="text"
              placeholder=" ..."
              className="rounded-xl border border-gray-600 bg-inherit px-4 py-2 text-white focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-600"
              {...register("description")}
            />
            {errors.description && (
              <p className="text-md mt-2 text-red-500">
                {" "}
                {errors.description.message}
              </p>
            )}
            <div className="flex justify-center align-middle">
              {isListingLoading || isSuccess ? (
                <Spinner />
              ) : (
                <button
                  type="submit"
                  className={`mx-4 mt-5 flex  flex-col items-center bg-white  p-2 text-black  hover:bg-[#FF5500] hover:text-white sm:my-8 sm:text-left md:text-xl xl:text-2xl ${serif.className}`}
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
