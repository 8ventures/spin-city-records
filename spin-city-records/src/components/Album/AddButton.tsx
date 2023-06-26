import {
  HeartIcon,
  ShoppingBagIcon,
  MusicalNoteIcon,
} from "@heroicons/react/24/solid";

type ButtonVariant = "wishlist" | "basket" | "collection";

interface AddButtonProps {
  variant: ButtonVariant;
}

const BASE_CLASSES =
  "flex hover:bg-opacity-80 text-white w-48 rounded-lg px-4 py-2 font-semibold mt-2 mb-2";
const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  wishlist: `bg-[#e963c5] ${BASE_CLASSES}`,
  basket: `bg-[#c91d45] ${BASE_CLASSES}`,
  collection: `bg-[#e963c5] ${BASE_CLASSES}`,
};

const VARIANT_CONTENT: Record<ButtonVariant, JSX.Element> = {
  wishlist: (
    <>
      <HeartIcon className="mr-2 h-6 w-6 " /> Add to wishlist{" "}
    </>
  ),
  basket: (
    <>
      <ShoppingBagIcon className="mr-2 h-6 w-6 " /> Add to basket{" "}
    </>
  ),
  collection: (
    <>
      <MusicalNoteIcon className="mr-2 h-6 w-6 " /> Add to collection{" "}
    </>
  ),
};

const AddButton: React.FC<AddButtonProps> = ({ variant = "basket" }) => {
  return (
    <button className={`${BASE_CLASSES} ${VARIANT_CLASSES[variant]}`}>
      {VARIANT_CONTENT[variant]}
    </button>
  );
};

export default AddButton;
