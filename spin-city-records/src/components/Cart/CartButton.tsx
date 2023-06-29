import {useState} from 'react';
import { BsBag, BsX } from 'react-icons/bs';

export default function CartButton() {

  const [showCart, setShowCart] = useState(false);

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
        </div>
      }
    </div>
  )
}