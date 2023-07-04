import {useState} from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
  AddressElement
} from "@stripe/react-stripe-js";
import { useForm, Controller } from "react-hook-form";


export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [payment, setPayment] = useState({ status: 'initial' })
  const [errorMessage, setErrorMessage] = useState('')
  const { handleSubmit, control,} = useForm();

  const PaymentStatus = ({ status }: { status: string }) => {
    switch (status) {
      case 'processing':
      case 'requires_payment_method':
      case 'requires_confirmation':
        return <h2>Processing...</h2>

      case 'requires_action':
        return <h2>Authenticating...</h2>

      case 'succeeded':
        return <h2>Payment Succeeded</h2>

      case 'error':
        return (
          <>
            <h2>Error</h2>
            <p className="error-message">{errorMessage}</p>
          </>
        )

      default:
        return null
    }
  }
  
  const onSubmit= async () => {
  
    if (!elements) return
    setPayment({ status: 'processing' })

    const { error } = await stripe!.confirmPayment({
      elements,
      confirmParams: {
        return_url: 'http://localhost:3000/Order',
        payment_method_data: {
          billing_details: {
            name: input.cardholderName,
          },
        },
      },
    })

    if (error) {
      setPayment({ status: 'error' })
      setErrorMessage(error.message ?? 'An unknown error occurred')
    }
  }

  return (
    <form id="payment-form" onSubmit={handleSubmit(onSubmit)}>
      <AddressElement id="address-element" options={{
        mode: 'shipping'
        }}
      />
      <PaymentElement id="payment-element" options={{
        layout: "tabs",
      }} />
      <button
          className="text-white bg-[#FF5500] font-bold h-fit w-fit p-2 rounded-xl"
          type="submit"
          disabled={
            !['initial', 'succeeded', 'error'].includes(payment.status) ||
            !stripe
          }
        >
          Pay
      </button>
      <PaymentStatus status={payment.status}/>
    </form>
  );
}