import { useContext } from "react";
import { Album, Listing } from "../../utils/types";
import { CartContext } from "../GlobalContext/CartContext";
import { WishlistContext } from "../GlobalContext/WishListContext";
import Button from "../Button";

interface AlbumInfoCardProps {
  album: Album;
  listings: Listing[];
  currentListing: Listing | undefined;
}

export default function AlbumInfoCard({
  album,
  listings,
  currentListing,
}: AlbumInfoCardProps) {
  const { cart, addToCart, removeFromCart } = useContext(CartContext);
  const { wishlist, addToWishlist, removeFromWishlist } =
    useContext(WishlistContext);

  const isInCart = currentListing
    ? cart.some((item) => item.id === currentListing.id)
    : false;

  const isInWishlist = album
    ? wishlist.some((item) => item.id === album.id)
    : false;

  const handleClickCart = () => {
    if (currentListing) {
      if (isInCart) {
        removeFromCart(currentListing);
      } else {
        addToCart(currentListing);
      }
    }
  };

  const handleClickWishlist = () => {
    if (album) {
      if (isInWishlist) {
        removeFromWishlist(album);
      } else {
        addToWishlist(album);
      }
    }
  };
  console.log(album);

  return (
    <>
      <div className="flex flex-col justify-center  text-white sm:flex-row">
        <img
          src={album.artwork}
          alt={`Artwork for ${album.name} by ${album.artist.name}`}
          className="mx-auto mb-2 mt-8 h-auto w-64 rounded-xl sm:mx-0 md:w-80 lg:w-96"
        />
        <div className="my-4 flex flex-col text-center sm:my-8 sm:ml-8">
          <span className="text-2xl sm:text-left md:text-3xl xl:text-4xl">
            {album.name}
          </span>
          <span className="text-xl sm:text-left md:text-2xl xl:text-3xl">
            <span className="text-[#FF5500]">by </span>{" "}
            <a className="cursor-pointer hover:underline">
              {" "}
              {album.artist.name}
            </a>
          </span>
          <span className="text-md sm:text-left md:text-lg xl:text-xl">
            {album.year}, {album.label}
          </span>

          {!currentListing && listings.length !== 0 && (
            <div className="my-4 text-xl sm:my-8 sm:text-left md:text-2xl xl:text-3xl">
              Starting at{" "}
              <span className=" text-[#FF5500]">
                {listings[0]?.price}
                {listings[0]?.currency}
              </span>
            </div>
          )}

          {!currentListing && listings.length === 0 && (
            <div className="text-md my-4 sm:my-8 sm:text-left md:text-lg xl:text-xl">
              <div className="">Album not available</div>
              <span className="cursor-pointer text-lg font-semibold text-[#FF5500] hover:underline sm:text-left md:text-xl xl:text-2xl">
                Start a listing
              </span>
            </div>
          )}

          {isInCart ? (
            <Button
              variant="removeBasket"
              className="m-4 flex justify-center rounded-lg border border-[#333333] bg-[#000000] px-4 py-2 text-base font-semibold text-white hover:border-[#333333] hover:bg-white hover:text-black"
              onClick={handleClickCart}
            />
          ) : (
            <Button
              variant="addBasket"
              className="m-4 flex justify-center rounded-lg border border-[#333333] bg-[#000000] px-4 py-2 text-base font-semibold text-white hover:border-[#333333] hover:bg-white hover:text-black"
              onClick={handleClickCart}
            />
          )}
        </div>
      </div>
    </>
  );
}

//   return (
//     <div className="flex">
//       <div className="mr-6">
//         <Image
//           src={album.artwork}
//           width={500}
//           height={500}
//           alt="Album Artwork"
//           className="rounded-lg border border-[#ffffff]"
//         />
//       </div>

//       <div className="m-4">
//         <div>
//           <h1 className="mb-2 text-5xl font-bold text-white">{album.name}</h1>
//           <h1 className="mb-2 text-2xl font-bold text-white ">
//             {album.artist.name}
//           </h1>
//           <h2 className="text-xl text-[#A1A1A1]">
//             {album.year}, {album.label}
//           </h2>
//         </div>
//         <div className="m-4">
//           {currentListing ? (
//             <div>
//               <div className="flex flex-row">
//                 <span className="text-md mr-4 text-[#A1A1A1]">Price:</span>
//                 <span className="text-md font-semibold text-white">
//                   {currentListing.price} {currentListing.currency}
//                 </span>
//               </div>
//               <div className="flex flex-row">
//                 <span className="text-md ml-4 text-[#A1A1A1]">Condition:</span>
//                 <span className="text-md font-semibold text-white">
//                   {currentListing.condition}
//                 </span>
//               </div>
//               <div className="flex flex-row">
//                 <span className="text-md ml-4 text-[#A1A1A1]">Format:</span>
//                 <span className="text-md font-semibold text-white">
//                   {currentListing.format}
//                 </span>
//               </div>
//               <div className="flex flex-row">
//                 <span className="text-md ml-4 text-[#A1A1A1]">Speed:</span>
//                 <span className="text-md font-semibold text-white">
//                   {currentListing.speed}
//                 </span>
//               </div>
//               <div className="flex flex-row">
//                 <span className="text-md ml-4 text-[#A1A1A1]">Weight:</span>
//                 <span className="text-md font-semibold text-white">
//                   {currentListing.weight}
//                 </span>
//               </div>
//               <div>
//                 {isInCart ? (
//                   <Button
//                     variant="removeBasket"
//                     className="m-4 flex justify-center rounded-lg border border-[#333333] bg-[#000000] px-4 py-2 text-base font-semibold text-white hover:border-[#333333] hover:bg-white hover:text-black"
//                     onClick={handleClick}
//                   />
//                 ) : (
//                   <Button
//                     variant="addBasket"
//                     className="m-4 flex justify-center rounded-lg border border-[#333333] bg-[#000000] px-4 py-2 text-base font-semibold text-white hover:border-[#333333] hover:bg-white hover:text-black"
//                     onClick={handleClick}
//                   />
//                 )}

//                 <Button
//                   variant="wishlist"
//                   className="m-4 flex justify-center rounded-lg border border-[#333333] bg-[#000000] px-4 py-2 text-base font-semibold text-white hover:border-[#333333] hover:bg-white hover:text-black"
//                 />
//                 <Button
//                   variant="collection"
//                   className="m-4 flex justify-center rounded-lg border border-[#333333] bg-[#000000] px-4 py-2 text-base font-semibold text-white hover:border-[#333333] hover:bg-white hover:text-black"
//                 />
//               </div>
//             </div>
//           ) : (
//             <div className="text-white">Not available</div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
