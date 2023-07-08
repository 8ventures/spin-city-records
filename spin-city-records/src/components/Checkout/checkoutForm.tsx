import { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
  AddressElement,
} from "@stripe/react-stripe-js";
import { useForm, Controller } from "react-hook-form";
import { CurrencyContext } from "~/components/GlobalContext/CurrencyContext";
import convertToGlobalCurrency from "../../utils/currencyConversion";
import { useContext } from "react";
import { Listing } from "~/utils/types";
import { sans, serif } from "../../utils/fonts";

type CheckoutFormProps = {
  listing: Listing;
};

export default function CheckoutForm({ listing }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();

  const [payment, setPayment] = useState({ status: "initial" });
  const [errorMessage, setErrorMessage] = useState("");
  const { currency } = useContext(CurrencyContext);

  const PaymentStatus = ({ status }: { status: string }) => {
    switch (status) {
      case "processing":
      case "requires_payment_method":
      case "requires_confirmation":
        return <h2>Processing...</h2>;

      case "requires_action":
        return <h2>Authenticating...</h2>;

      case "succeeded":
        return <h2>Payment Succeeded</h2>;

      case "error":
        return (
          <>
            <h2>Error</h2>
            <p className="error-message">{errorMessage}</p>
          </>
        );

      default:
        return null;
    }
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    console.log('From on submit')
    event.preventDefault();

    if (!elements) return;
    setPayment({ status: "processing" });

    const { error } = await stripe!.confirmPayment({
      elements,
      confirmParams: {
        return_url:
          "https://spin-city-records-gamma.vercel.app//profile/myOrders",
      },
    });

    if (error) {
      setPayment({ status: "error" });
      setErrorMessage(error.message ?? "An unknown error occurred");
    }
  };

  return (
    <form
      id="payment-form"
      onSubmit={onSubmit}
      className="flex flex-col items-center"
    >
      <AddressElement
        id="address-element"
        options={{
          mode: "shipping",
        }}
      />
      <PaymentElement
        id="payment-element"
        options={{
          layout: "tabs",
        }}
      />
      <button
        className={`mx-4 flex w-fit flex-col items-center bg-white  p-2 text-black  hover:bg-[#FF5500] hover:text-white sm:my-8 sm:text-left md:text-lg xl:text-xl ${serif.className}`}
        type="submit"
        disabled={
          !["initial", "succeeded", "error"].includes(payment.status) || !stripe
        }
      >
        <h3 className="font-normal ">Pay</h3>
        <span className="font-black md:text-lg xl:text-xl">
          {convertToGlobalCurrency(listing.price, listing.currency, currency)}{" "}
          {currency}
        </span>
      </button>
      <PaymentStatus status={payment.status} />
    </form>
  );
}
