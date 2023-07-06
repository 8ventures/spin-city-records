import React from "react";
import * as Select from "@radix-ui/react-select";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { SelectItem } from "../../components/selectItem";
import type { ControllerRenderProps } from "react-hook-form/dist/types/controller";
import type { Album } from "./SearchAlbumsForm";

type selectFormatProps = {
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
    "format"
  >;
};

const SelectFormat = React.forwardRef<HTMLButtonElement, selectFormatProps>(
  ({ field }, forwardedRef) => {
    return (
      <Select.Root
        onValueChange={field.onChange}
        name={field.name}
        value={field.value}
      >
        <Select.Trigger
          className="inline-flex  items-center justify-center gap-[10px] rounded-2xl bg-black py-2 text-lg leading-none text-gray-300 outline-none"
          aria-label="Format"
          ref={forwardedRef}
        >
          <Select.Value placeholder="Format" />
          <Select.Icon className="text-[#FF5500]">
            <ChevronDownIcon />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content className="cursor-pointer overflow-hidden rounded-2xl bg-black text-gray-300">
            <Select.Viewport className="p-[10px]">
              <Select.Group>
                <SelectItem
                  value='7"'
                  className="text-lg  outline-none hover:text-[#FF5500] hover:bg-gray-900"
                >
                  7&quot;
                </SelectItem>
                <SelectItem
                  value='10"'
                  className="text-lg  outline-none hover:text-[#FF5500] hover:bg-gray-900"
                >
                  10&quot;
                </SelectItem>
                <SelectItem
                  value='12"'
                  className="text-lg  outline-none hover:text-[#FF5500] hover:bg-gray-900"
                >
                  12&quot;
                </SelectItem>
              </Select.Group>
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    );
  }
);

SelectFormat.displayName = "SelectFormat";

export default SelectFormat;
