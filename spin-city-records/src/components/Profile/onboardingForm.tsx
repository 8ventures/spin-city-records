import { useRouter } from "next/router";
import { api } from "~/utils/api";
import Image, { type StaticImageData } from "next/image";
import circle from "../../../public/circle.svg";
import stripe from "../../../public/stripe-ar21.svg";
import { Separator } from "@radix-ui/react-separator";
import Spinner from "../spinner";
import { z } from 'zod';
import { SubmitHandler, useForm, Controller, useFormState, useFieldArray } from "react-hook-form";
import SelectLocation from "../onBoardingForm/selectLocation";

const validationSchema = z.object({
    name: z.string(),
    bio: z.string(),
    location: z.string()
})
type ValidationSchema = z.infer<typeof validationSchema>;

export default function OnboardingForm() {

  const router = useRouter()

  const { mutate: createSeller, data: url, isSuccess, isLoading } = api.sellers.create.useMutation();
  const {register, handleSubmit, control,} = useForm<ValidationSchema>({});


  if (isSuccess && url) {
    router.push(url).catch((e) => console.log(e))
  }

  const onSubmit = (e: ValidationSchema) => {
    createSeller(e)
  }

  return (
    <div className="flex justify-center items-center rounded-xl">
      <form className="flex flex-col items-center p-4 rounded-xl" onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full">
          <div className="flex space-x-5">
            <div className="flex flex-col">
              <label className="my-2 text-xl text-custom-orange">Enter Name</label>
              <input
                type="text"
                placeholder="e.g. Vince's Vinyl"
                className="rounded-xl border border-gray-600 bg-inherit text-white py-2 px-4 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                {...register("name")}
              />
            </div>
            <div className="flex flex-col">
              <label className="my-2 text-xl text-custom-orange">Choose Location</label>
              <Controller
                name="location"
                control={control}
                render={({ field }) => {
                  return <SelectLocation ref={field.ref} field={field} />;
                }}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label className="my-2 text-xl text-custom-orange">Enter Bio</label>
            <input
              type="text"
              placeholder="e.g. UK seller, Fast delivery, PM me for any questions!"
              className="rounded-xl border border-gray-600 bg-inherit text-white py-2 px-4 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
              {...register("bio")}
              />
          </div>
        </div>
        <div className=' text-white h-fit text-xl text-center my-2 mt-6 mb-5'>
          We use Stripe to make sure you get paid on time and to keep your personal bank and details secure.
          <br/>Click <strong className="font-black">Accept and Continue</strong> to set up your payments on Stripe.
        </div>
        <div className="flex space-between h-32 items-center my-2">
          <Image
          src={circle as StaticImageData}
          alt="circle"
          className=" h-24 w-24 mr-5"
          />
          <Separator
            className=" bg-slate-400 data-[orientation=vertical]:h-5/6 data-[orientation=vertical]:w-px mx-[15px]"
            orientation="vertical"
          />
          <Image
          src={stripe as StaticImageData}
          alt="stripe logo"
          className=" h-24 w-48"
          />
        </div>
        <div className="mt-5">
          {isLoading || isSuccess? (
            <Spinner/>
            ) : (
              <button className="text-custom-orange text-3xl mt-0" type='submit'>
                Accept and Continue
              </button>
            )
          }
        </div>
      </form>
    </div>
  )
}
