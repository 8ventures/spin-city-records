import React from "react";
import * as Select from "@radix-ui/react-select";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { SelectItem } from "../selectItem";
import type { ControllerRenderProps } from "react-hook-form/dist/types/controller";
import type { Album } from "./SearchAlbumsForm";

type selectSpeedProps = {
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
    "speed"
  >;
};

const SelectSpeed = React.forwardRef<HTMLButtonElement, selectSpeedProps>(
  ({ field }, forwardedRef) => {
    return (
      <Select.Root
        onValueChange={field.onChange}
        name={field.name}
        value={field.value}
      >
        <Select.Trigger
          className="inline-flex  items-center justify-center gap-[10px] rounded-2xl bg-black py-2 pl-[15px] text-lg leading-none text-gray-300 outline-none"
          aria-label="Speed"
          ref={forwardedRef}
        >
          <Select.Value placeholder="Speed" />
          <Select.Icon className="text-custom-orange">
            <ChevronDownIcon />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content className="cursor-pointer overflow-hidden  rounded-2xl bg-black text-gray-300">
            <Select.Viewport className="p-[10px]">
              <Select.Group>
                <SelectItem
                  value="33 1/3 RPM"
                  className="text-lg  outline-none hover:text-[#FF5500]  hover:bg-gray-900"
                >
                  33 1/3 RPM
                </SelectItem>
                <SelectItem
                  value="45 RPM"
                  className="text-lg  outline-none hover:text-[#FF5500] hover:bg-gray-900"
                >
                  45 RPM
                </SelectItem>
                <SelectItem
                  value="78 RPM"
                  className="text-lg  outline-none hover:text-[#FF5500] hover:bg-gray-900"
                >
                  78 RPM
                </SelectItem>
              </Select.Group>
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    );
  }
);

SelectSpeed.displayName = "SelectSpeed";

export default SelectSpeed;
