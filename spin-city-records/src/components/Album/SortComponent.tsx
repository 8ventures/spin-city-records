import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ChevronDownIcon, CheckIcon } from "@heroicons/react/24/solid";

interface SortByProps {
  handleSortOption: (option: string) => void;
  clearSort: () => void;
  sortOption: string | undefined;
  setSortOption: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export default function SortBy({
  handleSortOption,
  clearSort,
  sortOption,
  setSortOption,
}: SortByProps) {
  let triggerName = "Sort By";
  if (sortOption === "lowToHigh") {
    triggerName = "Price: Low to High";
  } else if (sortOption === "highToLow") {
    triggerName = "Price: High to Low";
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="text-md my-4 mr-12 inline text-white outline-none sm:mr-14 font-bold">
        {triggerName}{" "}
        <ChevronDownIcon className="inline-block h-5 w-5 text-white" />
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className="text-md w-40 rounded-2xl bg-black p-4 text-white">
        <DropdownMenu.Label className="text-md text-center font-black">
          Price
        </DropdownMenu.Label>
        <DropdownMenu.Item
          className="text-md cursor-pointer text-center rounded-xl outline-none py-1 hover:bg-gray-900"
          onClick={() => handleSortOption("lowToHigh")}
        >
          {`Low to High`}
        </DropdownMenu.Item>
        <DropdownMenu.Item
          className="text-md cursor-pointer text-center rounded-xl outline-none py-1 hover:bg-gray-900"
          onClick={() => handleSortOption("highToLow")}
        >
          {`High to Low`}
        </DropdownMenu.Item>
        <DropdownMenu.Separator className="" />

        <DropdownMenu.Item
          className="text-md cursor-pointer border-t border-b border-gray-900 text-center rounded-xl  font-semibold my-2 py-1 text-custom-orange outline-none hover:bg-gray-900"
          onClick={clearSort}
        >
          Clear Sort
        </DropdownMenu.Item>
        <DropdownMenu.Arrow />
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
