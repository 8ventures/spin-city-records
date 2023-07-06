import React from "react";
import * as Select from "@radix-ui/react-select";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { SelectItem } from "../../components/selectItem";
import type { ControllerRenderProps } from "react-hook-form/dist/types/controller";
import type { Album } from "./SearchAlbumsForm";

type selectConditionProps = {
  field: ControllerRenderProps<
    {
      price: number;
      currency: string;
      weight: string;
      format: string;
      description: string;
      condition: string;
      speed: string;
      album: Album;
      editions: { value: string }[];
    },
    "condition"
  >;
};

const SelectCondition = React.forwardRef<
  HTMLButtonElement,
  selectConditionProps
>(({ field }, forwardedRef) => {
  return (
    <Select.Root
      onValueChange={field.onChange}
      name={field.name}
      value={field.value}
    >
      <Select.Trigger
        className="inline-flex items-center justify-center gap-[10px] rounded-xl bg-black py-2 text-lg leading-none text-gray-300 outline-none"
        aria-label="Condition"
        ref={forwardedRef}
      >
        <Select.Value placeholder="Condition" />
        <Select.Icon className="text-[#FF5500]">
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="cursor-pointer overflow-hidden rounded-xl bg-black text-gray-300">
          <Select.Viewport className="p-[10px]">
            <Select.Group>
              <SelectItem
                value="Mint"
                className="text-lg  outline-none hover:text-[#FF5500]"
              >
                Mint
              </SelectItem>
              <SelectItem
                value="Near Mint"
                className="text-lg  outline-none hover:text-[#FF5500]"
              >
                Near Mint
              </SelectItem>
              <SelectItem
                value="Very Good"
                className="text-lg  outline-none hover:text-[#FF5500]"
              >
                Very Good
              </SelectItem>
              <SelectItem
                value="Good"
                className="text-lg  outline-none hover:text-[#FF5500]"
              >
                Good
              </SelectItem>
              <SelectItem
                value="Fair"
                className="text-lg  outline-none hover:text-[#FF5500]"
              >
                Fair
              </SelectItem>
              <SelectItem
                value="Poor"
                className="text-lg  outline-none hover:text-[#FF5500]"
              >
                Poor
              </SelectItem>
            </Select.Group>
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
});

SelectCondition.displayName = "SelectCondition";

export default SelectCondition;
