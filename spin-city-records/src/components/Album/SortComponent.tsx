import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

export default function SortBy() {
  return (
    <div className="flex flex-col text-white">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>Sort By</DropdownMenu.Trigger>

        <DropdownMenu.Content>
          <DropdownMenu.Label>Select a Sort Option</DropdownMenu.Label>
          <DropdownMenu.Item>Price (Low to High)</DropdownMenu.Item>
          <DropdownMenu.Item>Price (High to Low)</DropdownMenu.Item>
          <DropdownMenu.Separator />

          <DropdownMenu.Item>Clear Sort</DropdownMenu.Item>

          <DropdownMenu.Arrow />
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  );
}
