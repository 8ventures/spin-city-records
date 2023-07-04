import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements,
  AddressElement,
  CardElement
} from "@stripe/react-stripe-js";

export default function CheckoutForm({clientSecret}) {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: 'Jenny Rosen',
        },
      }
    })
    if (result.error) {
      console.log(result.error.message);
    } else {
      if (result.paymentIntent.status === 'succeeded') {
        //add redirect
      }
    }
  }

  return (
    <form id='payment-form' onSubmit={handleSubmit}>
      <label>Shippin Address</label>
      <AddressElement options={{mode: 'shipping'}}/>
      <h3>Payment</h3>
      <PaymentElement />
      <button type="submit">Pay</button>
    </form>
  )
}