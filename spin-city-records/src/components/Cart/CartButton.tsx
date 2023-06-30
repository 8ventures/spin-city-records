import { useRouter } from 'next/router';
import {useState} from 'react';
import { BsBag, BsX } from 'react-icons/bs';
import { api } from '~/utils/api';

export default function CartButton() {

  const router = useRouter()

  const [showCart, setShowCart] = useState(false);

  const { mutate: createSession, data: url, isSuccess }= api.stripe.checkoutSession.useMutation()

  const startCheckout = () => {
    createSession()
    if (isSuccess && url) {
      console.log('here')
      router.push(url).catch((e) => console.log(e))
    } else {
      console.log('Unable to register')
    }
  }

  return (
    <div className='relative'>
      <button className='h-4 w-4' onClick={() => setShowCart(true)}>
        <BsBag />
      </button>
      {showCart && 
        <div className='absolute bg-white text-black'>
          <div>Cart</div>
          <button onClick={()=> setShowCart(false)}>
            <BsX/>
          </button>
          <button onClick={startCheckout}>
            Checkout
          </button>
        </div>
      }
    </div>
  )
}