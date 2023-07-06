import { useRouter } from "next/router";
import { api } from "~/utils/api";
import Image, { type StaticImageData } from "next/image";
import circle from "../../../public/circle.svg";
import stripe from "../../../public/stripe-ar21.svg";
import { Separator } from "@radix-ui/react-separator";
import Spinner from "../spinner";
import { z } from 'zod';
import { zodResolver} from '@hookform/resolvers/zod'
import { SubmitHandler, useForm, Controller, useFormState, useFieldArray } from "react-hook-form";
import SelectLocation from "../onBoardingForm/selectLocation";
import { sans, serif} from '../../utils/fonts'

const requiredError ={required_error: 'This field is required'}

const validationSchema = z.object({
    name: z.string().min(5, { message: "Must be at least 5 character long" }),
    bio: z.string().min(5, { message: "Must be at least 5 character long" }),
    location: z.string(requiredError)
})
type ValidationSchema = z.infer<typeof validationSchema>;

export default function OnboardingForm() {

  const router = useRouter()

  const { mutate: createSeller, data: url, isSuccess, isLoading } = api.sellers.create.useMutation();
  const {register, handleSubmit, control, formState: {errors}} = useForm<ValidationSchema>({resolver: zodResolver(validationSchema)});


  if (isSuccess && url) {
    router.push(url).catch((e) => console.log(e))
  }

  const onSubmit = (e: ValidationSchema) => {
    createSeller(e)
  }

  return (
    <div className={`flex justify-center items-center rounded-xl text-white ${sans.className}`}>
      <form className="flex flex-col w-5/6 md:w-1/2 xl:w-2/5 items-center p-4 rounded-xl" onSubmit={handleSubmit(onSubmit)}>
          <label className="my-2 text-xl ">Enter Name</label>
          <div className="flex space-x-5 flex-wrap items-center">
            <input
              type="text"
              placeholder="e.g. Vince's Vinyl"
              className="rounded-xl border border-gray-600 bg-inherit text-white py-2 px-4 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
              {...register("name")}
            />
            {errors.name && (
                <p className="text-md text-red-500 mt-2"> {errors.name.message}
                </p>
            )}
          <Controller
            name="location"
            control={control}
            render={({ field }) => {
              return <SelectLocation ref={field.ref} field={field} />;
            }}
            />
            {errors.location && (
                <p className="text-md text-red-500 mt-2"> {errors.location.message}
                </p>
            )}
            </div>
          <div className="flex flex-col items-center w-full">
            <label className="my-2 text-xl ">Enter Bio</label>
            <input
              type="text"
              placeholder="e.g. UK seller, Fast delivery, PM me for any questions!"
              className="rounded-xl border w-full border-gray-600 bg-inherit text-white py-2 px-4 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
              {...register("bio")}
              />
              {errors.bio && (
                <p className="text-md text-red-500 mt-2"> {errors.bio.message}
                </p>
            )}
          </div>
        <div className=' text-white h-fit text-lg text-center my-2 mt-6 mb-5'>
          We use Stripe to make sure you get paid on time and to keep your personal bank and details secure.
          <br/>Click <strong className="font-black">Accept and Continue</strong> to set up your payments on Stripe.
        </div>
        <div className="md:flex flex-wrap space-between h-32 items-center mt-2 hidden">
          <Image
          src={circle as StaticImageData}
          alt="circle"
          className=" h-24 w-24 md:mr-5"
          />
          <Separator
            className=" bg-slate-400 data-[orientation=vertical]:h-5/6 data-[orientation=vertical]:w-px mx-[15px] "
            orientation="vertical"
          />
          <Image
          src={stripe as StaticImageData}
          alt="stripe logo"
          className=" h-24 w-48"
          />
        </div>
        <div className="mb-2">
          {isLoading || isSuccess? (
            <Spinner/>
            ) : (
              <button className={` bg-black border-4 border-gray-900 font-black rounded-full text-custom-orange hover:bg-custom-orange hover:text-black text-xl py-2 px-4 mt-8`} type="submit">
                  Accept and Continue
                </button>
            )
          }
        </div>
      </form>
    </div>
  )
}
