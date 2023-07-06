import { useState, useEffect, useContext } from "react";
import { Album, Listing, Collection } from "../../utils/types";
import convertToGlobalCurrency from "../../utils/currencyConversion";
import { CartContext } from "../GlobalContext/CartContext";
import { CurrencyContext } from "../GlobalContext/CurrencyContext";
import RatingStars from "./RatingStars";
import { HeartIcon as EmptyHeart } from "@heroicons/react/24/outline";
import { HeartIcon as FilledHeart } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { useUser } from "@clerk/nextjs";
import { serif, sans } from "../../utils/fonts";
import { toast } from "react-toastify";
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
  //Global Context
  const { cart, addToCart, removeFromCart } = useContext(CartContext);

  // State
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [lowestPriceListing, setLowestPriceListing] = useState<Listing>();
  const [collection, setCollection] = useState<Collection>();

  //Data Fetching
  const router = useRouter();
  const { user } = useUser();
  const currentUserId = user?.id;
  let collections: Collection[];

  let sellerChecking = false;
  if (currentUserId) {
    const sellerCheck = api.sellers.checkIfSeller.useQuery({
      clerkId: currentUserId || "",
    });
    if (sellerCheck.data) {
      sellerChecking = true;
    }
  }
  const {
    data: collectionsQueryData,
    error: collectionsQueryError,
    isLoading: collectionsQueryLoading,
    isError: collectionsQueryIsError,
    isSuccess: collectionsQuerySuccess,
  } = api.collections.getByUserId.useQuery({
    userId: currentUserId!,
  });
  collections = collectionsQueryData as Collection[];

  const {
    mutate: createCollection,
    isSuccess: createCollectionIsSuccess,
    isError: createCollectionIsError,
  } = api.collections.create.useMutation();

  const {
    mutate: addAlbumToCollection,
    data: addAlbumToCollectionData,
    isSuccess: addAlbumToCollectionIsSuccess,
    isError: addAlbumToCollectionIsError,
  } = api.collections.addAlbum.useMutation();

  const {
    mutate: removeAlbumFromCollection,
    data: removeAlbumFromCollectionData,
    isSuccess: removeAlbumFromCollectionIsSuccess,
    isError: removeAlbumFromCollectionIsError,
  } = api.collections.removeAlbum.useMutation();

  //Side Effects
  useEffect(() => {
    if (user && collectionsQuerySuccess && collectionsQueryData) {
      setCollection(
        collections.find((collection) => collection.name === "Wishlist")
      );
      if (collection) {
        const isInWishlist = collection.albums.some(
          (wishlistAlbum) => wishlistAlbum.id === album.id
        );
        setIsInWishlist(isInWishlist);
      }
      if (!collection) {
        createCollection({ userId: currentUserId!, name: "Wishlist" });
      }
    }
  }, [
    currentUserId,
    collectionsQuerySuccess,
    collectionsQueryData,
    collection,
  ]);

  const { currency } = useContext(CurrencyContext);

  //Logic
  function findLowestPriceListing(listings: Listing[], currency: string) {
    let lowestPriceListing: Listing | undefined = undefined;
    let lowestPrice = Infinity;

    listings.forEach((listing) => {
      const convertedPrice = convertToGlobalCurrency(
        listing.price,
        listing.currency,
        currency
      );
      if (convertedPrice < lowestPrice) {
        lowestPrice = convertedPrice;
        lowestPriceListing = listing;
      }
    });
    return lowestPriceListing;
  }

  const handleClickWishlist = async () => {
    if (!user) {
      toast.error("Please login or sign up", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "dark",
      });
      router
        .push({
          pathname: "/profile/wishlist",
        })
        .catch((e) => console.log(e));
      return;
    }
    if (collection) {
      const newIsInWishlist = !isInWishlist;
      setIsInWishlist(newIsInWishlist);

      try {
        if (newIsInWishlist) {
          await addAlbumToCollection({
            collectionId: collection.id,
            albumId: album.id,
          });
        } else {
          await removeAlbumFromCollection({
            collectionId: collection.id,
            albumId: album.id,
          });
        }
      } catch (error) {
        console.error("Error:", error);
        setIsInWishlist(!newIsInWishlist);
      }
    }
  };

  const handleCreateListing = () => {
    if (sellerChecking) {
      router
        .push({
          pathname: "/profile/createListing",
        })
        .catch((e) => console.log(e));
    } else if (!sellerChecking && user) {
      router
        .push({
          pathname: "/profile/startSelling",
        })
        .catch((e) => console.log(e));
      toast.error("Please register as a Seller firstly!", {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
      });
    } else {
      router
        .push({
          pathname: "/profile/startSelling",
        })
        .catch((e) => console.log(e));
    }
  };

  const handleClickArtist = (album: Album) => {
    const normalizedArtist = album.artist.name.replace(/\s+/g, "-");
    router
      .push({
        pathname: `/artist/${normalizedArtist}/`,
        query: { id: album.artist.id },
      })
      .catch((e) => console.log(e));
  };

  const handleClickCart = () => {
    if (currentListing) {
      if (isInCart) {
        removeFromCart(currentListing);
        setIsInCart(false);
      } else {
        addToCart(currentListing);
        setIsInCart(true);
      }
    }
  };

  useEffect(() => {
    if (currentListing) {
      if (cart.some((cartListing) => cartListing.id === currentListing.id)) {
        setIsInCart(true);
      } else {
        setIsInCart(false);
      }
    }
  }, [cart, currentListing]);

  useEffect(() => {
    if (listings.length !== 0) {
      setLowestPriceListing(findLowestPriceListing(listings, currency));
    }
  }, [listings, currency]);

  return (
    <>
      <div className="h-128 flex  flex-col justify-center text-white sm:flex-row">
        <div className="mx-auto mb-10 mt-8 h-64 w-64 overflow-hidden rounded-xl sm:mx-0 md:h-96 md:w-96">
          <img
            src={album.artwork}
            alt={`Artwork for ${album.name} by ${album.artist.name}`}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="my-4 flex flex-col text-center sm:my-8 sm:ml-8">
          <span className="text-2xl sm:text-left md:text-3xl xl:text-4xl">
            {album.name}
          </span>
          <span className="text-xl sm:text-left md:text-2xl xl:text-3xl">
            <span className="text-[#A1A1A1]">by </span>{" "}
            <a
              className="cursor-pointer hover:underline"
              onClick={() => handleClickArtist(album)}
            >
              {" "}
              {album.artist.name}
            </a>
          </span>
          <span className="text-md sm:text-left md:text-lg xl:text-xl">
            {album.year}, {album.label}
          </span>
          {!currentListing && listings.length !== 0 && lowestPriceListing && (
            <div className="my-4 text-lg sm:my-8 sm:text-left md:text-xl xl:text-2xl">
              Starting at{" "}
              <span className="text-2xl font-semibold text-[#FF5500] ">
                {convertToGlobalCurrency(
                  lowestPriceListing.price,
                  lowestPriceListing.currency,
                  currency
                )}{" "}
                {currency}
              </span>
            </div>
          )}
          {!currentListing && listings.length === 0 && (
            <div className="text-md my-4 sm:my-8 sm:text-left md:text-lg xl:text-xl">
              <div className="">No available listings</div>
              <div
                className="cursor-pointer text-lg font-semibold text-[#FF5500] hover:underline sm:text-left md:text-xl xl:text-2xl"
                onClick={() => handleCreateListing()}
              >
                Create a listing
              </div>
              <button
                onClick={handleClickWishlist}
                className="mt-8 h-9 w-9 text-red-500"
              >
                {isInWishlist ? <FilledHeart /> : <EmptyHeart />}
              </button>
            </div>
          )}
          {currentListing && (
            <div className="text-md my-2 md:text-lg xl:text-xl ">
              <div className="my-2 block text-center font-semibold sm:text-left">
                <span className="text-2xl text-[#FF5500] ">
                  {convertToGlobalCurrency(
                    currentListing.price,
                    currentListing.currency,
                    currency
                  )}{" "}
                  {currency}
                </span>
                <span className="text-2xl text-[#A1A1A1]"> + shipping</span>
                <span className="mr-2 block text-center  text-sm text-[#A1A1A1] sm:text-left">
                  Sold by:{" "}
                  <span className="text-white">
                    {" "}
                    {currentListing.seller!.name},{" "}
                    {currentListing.seller!.location}
                  </span>
                  <span className="ml-0 mt-2 flex items-center justify-center text-white sm:ml-2 sm:mt-0 sm:inline-flex">
                    {currentListing.seller!.rating ? (
                      <RatingStars rating={currentListing.seller!.rating} />
                    ) : (
                      "(0 reviews)"
                    )}
                  </span>{" "}
                </span>
              </div>
              <div className="block text-center text-lg sm:text-left">
                <span className="mr-2 font-semibold text-[#A1A1A1]">
                  Condition:
                </span>
                <span className="text-white">{currentListing.condition}</span>
              </div>
              <div className="block text-center text-lg sm:text-left">
                <span className="mr-2 font-semibold text-[#A1A1A1]">
                  Format:
                </span>
                <span className="text-white">{currentListing.format}</span>
              </div>
              <div className="block text-center text-lg sm:text-left">
                <span className="mr-2 font-semibold text-[#A1A1A1]">
                  Weight:
                </span>
                <span className="text-white">{currentListing.weight}</span>
              </div>
              <div className="block text-center text-lg sm:text-left">
                <span className="mr-2 font-semibold text-[#A1A1A1]">
                  Speed:
                </span>
                <span className="text-white">{currentListing.speed}</span>
              </div>
              {currentListing.edition &&
                currentListing.edition.length !== 0 && (
                  <div className="block text-center text-lg sm:text-left">
                    <span className="mr-2 font-semibold text-[#A1A1A1]">
                      Edition:
                    </span>
                    {currentListing.edition.map((edition, index) => (
                      <span key={index} className="text-white">
                        {index > 0 && ", "} {edition.type}
                      </span>
                    ))}
                  </div>
                )}
              {currentListing.description && (
                <div className="block text-center text-lg sm:text-left">
                  <span className="mr-2 font-semibold text-[#A1A1A1]">
                    Description:
                  </span>
                  <span className="text-white">
                    {currentListing.description}
                  </span>
                </div>
              )}

              <div className="mt-4 flex flex-row items-center justify-center sm:justify-start">
                <button
                  onClick={handleClickWishlist}
                  className="mx-5 h-10 w-10 text-red-600"
                >
                  {isInWishlist ? <FilledHeart /> : <EmptyHeart />}
                </button>
                <button
                  onClick={handleClickCart}
                  className={`mx-4 flex  flex-col items-center bg-white  p-2 text-black  hover:bg-[#FF5500] hover:text-white sm:my-8 sm:text-left md:text-xl xl:text-2xl ${serif.className}`}
                >
                  {isInCart ? "Remove from cart" : "Add to cart"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
