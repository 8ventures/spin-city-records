import { useRouter } from "next/router";
import { api } from "~/utils/api";
import Image, { type StaticImageData } from "next/image";
import circle from "../../../public/circle.svg";
import stripe from "../../../public/stripe-ar21.svg";
import { Separator } from "@radix-ui/react-separator";

export default function OnboardingForm() {
  const {
    mutate: createSeller,
    data: url,
    isSuccess,
  } = api.sellers.create.useMutation();
  const router = useRouter();

  const handleClick = () => {
    createSeller();
    if (isSuccess && url) {
      router.push(url).catch((e) => console.log(e));
    } else {
      console.log("Unable to register");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className=" my-2 h-fit w-96 text-center text-2xl text-white">
        We use Stripe to make sure you get paid on time and to keep your
        personal bank and details secure.
        <br />
        <br />
        Click <strong>Accept and Continue</strong> to set up your payments on
        Stripe.
      </div>
      <div className="space-between my-2 flex h-32 items-center">
        <Image
          src={circle as StaticImageData}
          alt="circle"
          className=" mr-5 h-24 w-24"
        />
        <Separator
          className=" mx-[15px] bg-slate-400 data-[orientation=vertical]:h-5/6 data-[orientation=vertical]:w-px"
          orientation="vertical"
        />
        <Image
          src={stripe as StaticImageData}
          alt="stripe logo"
          className=" h-24 w-48"
        />
      </div>

      <button
        className="mt-5 h-fit w-fit text-2xl text-white"
        onClick={handleClick}
      >
        Accept and Continue
      </button>
    </div>
  );
}
