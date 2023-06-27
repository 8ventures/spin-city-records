import {
  HeartIcon,
  ShoppingBagIcon,
  MusicalNoteIcon,
  CursorArrowRaysIcon,
} from "@heroicons/react/24/solid";

type ButtonVariant = "wishlist" | "basket" | "collection" | "select";

interface AddButtonProps {
  className?: string;
  variant: ButtonVariant;
  onClick?: () => void;
}

const BASE_CLASSES =
  "flex hover:bg-white hover:text-black hover:border-[#333333] text-white px-4 py-2 font-semibold m-4 border border-[#333333] rounded-lg text-base justify-center ";
const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  wishlist: `bg-[#000000] ${BASE_CLASSES}`,
  basket: `bg-[#000000] ${BASE_CLASSES}`,
  collection: `bg-[#000000] ${BASE_CLASSES}`,
  select: `bg-[#000000] ${BASE_CLASSES}`,
};

const VARIANT_CONTENT: Record<ButtonVariant, JSX.Element> = {
  wishlist: (
    <>
      <HeartIcon className="mr-2 h-6 w-6 text-red-500 " /> Add to wishlist{" "}
    </>
  ),
  basket: (
    <>
      <ShoppingBagIcon className="mr-2 h-6 w-6  " /> Add to basket{" "}
    </>
  ),
  collection: (
    <>
      <MusicalNoteIcon className="mr-2 h-6 w-6 " /> Add to collection{" "}
    </>
  ),
  select: (
    <>
      <CursorArrowRaysIcon className="mr-2 h-6 w-6 " /> Select listing{" "}
    </>
  ),
};

const Button: React.FC<AddButtonProps> = ({ variant = "basket", onClick }) => {
  return (
    <button className={`${BASE_CLASSES} ${VARIANT_CLASSES[variant]}`}>
      {VARIANT_CONTENT[variant]}
    </button>
  );
};

export default Button;
