import React from "react";
import * as Select from "@radix-ui/react-select";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { SelectItem } from "../../components/selectItem";
import type { ControllerRenderProps } from "react-hook-form/dist/types/controller";
import type { Album } from "./SearchAlbumsForm";

type selectWeightProps = {
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
    "weight"
  >;
};

const SelectWeight = React.forwardRef<HTMLButtonElement, selectWeightProps>(
  ({ field }, forwardRef) => {
    return (
      <Select.Root
        onValueChange={field.onChange}
        name={field.name}
        value={field.value}
      >
        <Select.Trigger
          className="inline-flex items-center justify-center gap-[5px] rounded-2xl bg-black  py-2 text-lg leading-none text-gray-300 outline-none"
          aria-label="Weight"
          ref={forwardRef}
        >
          <Select.Value placeholder="Select Weight" />
          <Select.Icon className="text-[#FF5500]">
            <ChevronDownIcon />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content className="cursor-pointer overflow-hidden rounded-2xl bg-black text-gray-300">
            <Select.Viewport className="p-[5px]">
              <Select.Group>
                <SelectItem
                  value="standard"
                  className="text-lg  outline-none  hover:bg-gray-900 hover:text-[#FF5500]"
                >
                  Standard
                </SelectItem>
                <SelectItem
                  value="180"
                  className="text-lg  outline-none  hover:bg-gray-900 hover:text-[#FF5500]"
                >
                  180 grams
                </SelectItem>
              </Select.Group>
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    );
  }
);

SelectWeight.displayName = "SelectWeight";

export default SelectWeight;
