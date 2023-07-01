import Layout from "~/components/Layout/Layout";
import { Listing } from "~/utils/types";
import { useContext } from "react";
import { CartContext } from "~/components/CartContext";
import getSymbolFromCurrency from "currency-symbol-map";

function Cart() {
  const { cart } = useContext(CartContext);

  const handleCheckout = () => {
    console.log('here')
  }

  return (
    <Layout>
      <div className="h-screen text-white">
        <h1 className="mb-4 text-4xl">Shopping Cart</h1>
        {cart.length > 0 ? (
          cart.map((listing) => (
            <div
              key={listing.id}
              className="mb-4 rounded-lg border bg-white p-4 text-black"
            >
              <div>
                <strong>Price:</strong>{" "}
                {getSymbolFromCurrency(listing.currency)}
                {listing.price}
              </div>
              <div>
                <strong>Condition:</strong> {listing.condition}
              </div>
              <div>
                <strong>Format:</strong> {listing.format}
              </div>
              <div>
                <strong>Speed:</strong> {listing.speed}
              </div>
              <div>
                <strong>Weight:</strong> {listing.weight}
              </div>
            </div>
          ))
          ) : (
            <div>Your cart is empty.</div>
            )}
      </div>
            <button className=" text-2xl text-white " onClick={handleCheckout}>Checkout</button>
    </Layout>
  );
}

export default Cart;
