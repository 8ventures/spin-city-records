import { useState } from "react";
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
    triggerName = "Low to High";
  } else if (sortOption === "highToLow") {
    triggerName = "High to Low";
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="my-4 mr-12 inline text-lg text-white outline-none sm:mr-14">
        {triggerName}{" "}
        <ChevronDownIcon className="inline-block h-5 w-5 text-white" />
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className="text-md w-40 rounded-xl bg-white p-4 text-black">
        <DropdownMenu.Label className="font-semibold">Price</DropdownMenu.Label>
        <DropdownMenu.Item
          className="cursor-pointer text-center outline-none"
          onClick={() => handleSortOption("lowToHigh")}
        >
          {sortOption === "lowToHigh" && (
            <CheckIcon className="inline-block h-4 w-4 text-black" />
          )}{" "}
          {`Low to High`}
        </DropdownMenu.Item>
        <DropdownMenu.Item
          className="cursor-pointer text-center outline-none"
          onClick={() => handleSortOption("highToLow")}
        >
          {" "}
          {sortOption === "highToLow" && (
            <CheckIcon className=" inline-block h-4 w-4 text-black" />
          )}{" "}
          {`High to Low`}
        </DropdownMenu.Item>
        <DropdownMenu.Separator className="my-4 border-b" />

        <DropdownMenu.Item
          className="cursor-pointer text-center outline-none"
          onClick={clearSort}
        >
          Clear Sort
        </DropdownMenu.Item>
        <DropdownMenu.Arrow />
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
