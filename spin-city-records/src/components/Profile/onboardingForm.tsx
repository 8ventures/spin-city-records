import { useRouter } from "next/router";
import { api } from "~/utils/api";
import Image, { type StaticImageData } from "next/image"
import circle from '../../../public/circle.svg'
import stripe from '../../../public/stripe-ar21.svg'
import { Separator } from "@radix-ui/react-separator";
import Spinner from "../spinner";

export default function OnboardingForm() {
  const { mutate: createSeller, data: url, isSuccess, isLoading } = api.sellers.create.useMutation();

  const router = useRouter()

  const handleClick = () => {
    createSeller()
  }

  if (isSuccess && url) {
    router.push(url).catch((e) => console.log(e))
  }

  return (
    <div className="flex flex-col items-center">
      <div className=' text-white w-96 h-fit text-2xl text-center my-2'>
        We use Stripe to make sure you get paid on time and to keep your personal bank and details secure.
        <br/><br/>Click <strong>Accept and Continue</strong> to set up your payments on Stripe.
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
            <button className="text-white text-2xl" onClick={handleClick}>
              Accept and Continue
            </button>
          )
        }
      </div>
    </div>
  )
}
