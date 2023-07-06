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
  const { handleSubmit, control } = useForm();
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

  const onSubmit = async () => {
    if (!elements) return;
    setPayment({ status: "processing" });

    const { error } = await stripe!.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/order/",
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
      onSubmit={handleSubmit(onSubmit)}
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
        className={`flex space-x-2 p-2 sm:my-8 sm:text-left md:text-xl xl:text-2xl
          ${serif.className} h-fit items-center bg-white text-black
          hover:bg-[#FF5500] hover:text-white
          `}
        type="submit"
        disabled={
          !["initial", "succeeded", "error"].includes(payment.status) || !stripe
        }
      >
        <h3 className="font-semibold ">PAY</h3>
        <span className="text-2xl font-semibold">
          {convertToGlobalCurrency(listing.price, listing.currency, currency)}{" "}
          {currency}
        </span>
      </button>
      <PaymentStatus status={payment.status} />
    </form>
  );
}
