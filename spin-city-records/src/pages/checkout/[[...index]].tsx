import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"



export default function Checkout() {
  
  const stripePubKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

  if (!stripePubKey) {
    return 'Loading...'
  }
  const stripe = loadStripe(stripePubKey)

  return (
    <div>Checkout Page</div>
  )
}