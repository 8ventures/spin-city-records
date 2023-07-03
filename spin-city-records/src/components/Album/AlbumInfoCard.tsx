import { useContext } from "react";
import { Album, Listing } from "~/utils/types";
import Image from "next/image";
import Button from "../Button";
import { CartContext } from "../GlobalContext/CartContext";

interface AlbumInfoCardProps {
  album: Album;
  listing?: Listing;
}

export default function AlbumInfoCard({ album, listing }: AlbumInfoCardProps) {
  if (!album) {
    return null;
  }

  const { cart, addToCart, removeFromCart } = useContext(CartContext);

  const isInCart = listing
    ? cart.some((item) => item.id === listing.id)
    : false;

  const handleClick = () => {
    if (listing) {
      if (isInCart) {
        removeFromCart(listing);
        console.log("Item removed from cart: ", listing);
      } else {
        addToCart(listing);
        console.log("Item added to cart: ", listing);
      }
    }
  };

  return (
    <div className="flex">
      <div className="mr-6">
        <Image
          src={album.artwork}
          width={500}
          height={500}
          alt="Album Artwork"
          className="rounded-lg border border-[#ffffff]"
        />
      </div>

      <div className="m-4">
        <div>
          <h1 className="mb-2 text-5xl font-bold text-white">{album.name}</h1>
          <h1 className="mb-2 text-2xl font-bold text-white ">
            {album.artist.name}
          </h1>
          <h2 className="text-xl text-[#A1A1A1]">
            {album.year}, {album.label}
          </h2>
        </div>
        <div className="m-4">
          {listing ? (
            <div>
              <div className="flex flex-row">
                <span className="text-md mr-4 text-[#A1A1A1]">Price:</span>
                <span className="text-md font-semibold text-white">
                  {listing.price} {listing.currency}
                </span>
              </div>
              <div className="flex flex-row">
                <span className="text-md ml-4 text-[#A1A1A1]">Condition:</span>
                <span className="text-md font-semibold text-white">
                  {listing.condition}
                </span>
              </div>
              <div className="flex flex-row">
                <span className="text-md ml-4 text-[#A1A1A1]">Format:</span>
                <span className="text-md font-semibold text-white">
                  {listing.format}
                </span>
              </div>
              <div className="flex flex-row">
                <span className="text-md ml-4 text-[#A1A1A1]">Speed:</span>
                <span className="text-md font-semibold text-white">
                  {listing.speed}
                </span>
              </div>
              <div className="flex flex-row">
                <span className="text-md ml-4 text-[#A1A1A1]">Weight:</span>
                <span className="text-md font-semibold text-white">
                  {listing.weight}
                </span>
              </div>
              <div>
                {isInCart ? (
                  <Button
                    variant="removeBasket"
                    className="m-4 flex justify-center rounded-lg border border-[#333333] bg-[#000000] px-4 py-2 text-base font-semibold text-white hover:border-[#333333] hover:bg-white hover:text-black"
                    onClick={handleClick}
                  />
                ) : (
                  <Button
                    variant="addBasket"
                    className="m-4 flex justify-center rounded-lg border border-[#333333] bg-[#000000] px-4 py-2 text-base font-semibold text-white hover:border-[#333333] hover:bg-white hover:text-black"
                    onClick={handleClick}
                  />
                )}

                <Button
                  variant="wishlist"
                  className="m-4 flex justify-center rounded-lg border border-[#333333] bg-[#000000] px-4 py-2 text-base font-semibold text-white hover:border-[#333333] hover:bg-white hover:text-black"
                />
                <Button
                  variant="collection"
                  className="m-4 flex justify-center rounded-lg border border-[#333333] bg-[#000000] px-4 py-2 text-base font-semibold text-white hover:border-[#333333] hover:bg-white hover:text-black"
                />
              </div>
            </div>
          ) : (
            <div className="text-white">Not available</div>
          )}
        </div>
      </div>
    </div>
  );
}
