import React from "react";
import * as Select from "@radix-ui/react-select";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { SelectItem } from "../../components/selectItem";
import type { ControllerRenderProps } from "react-hook-form/dist/types";
import type { Album } from "./SearchAlbumsForm";

type selectCurrencyProps = {
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
    "currency"
  >;
};
const SelectCurrency = React.forwardRef<HTMLButtonElement, selectCurrencyProps>(
  ({ field }, forwardedRef) => {
    return (
      <Select.Root
        onValueChange={field.onChange}
        name={field.name}
        value={field.value}
      >
        <Select.Trigger
          className="inline-flex items-center justify-center gap-[10px] rounded-2xl bg-black px-[15px] py-2 text-lg leading-none text-gray-300 outline-none"
          aria-label="Condition"
          ref={forwardedRef}
        >
          <Select.Value placeholder="Select Currency" />
          <Select.Icon className="text-[#FF5500]">
            <ChevronDownIcon />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content className="cursor-pointer overflow-hidden rounded-2xl bg-black text-gray-300">
            <Select.Viewport className="p-[10px]">
              <Select.Group>
                <SelectItem
                  value="gbp"
                  className="text-lg  outline-none hover:text-[#FF5500] hover:bg-gray-900"
                >
                  GBP
                </SelectItem>
                <SelectItem
                  value="eur"
                  className="text-lg  outline-none hover:text-[#FF5500] hover:bg-gray-900"
                >
                  EUR
                </SelectItem>
                <SelectItem
                  value="usd"
                  className="text-lg  outline-none hover:text-[#FF5500] hover:bg-gray-900"
                >
                  USD
                </SelectItem>
              </Select.Group>
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    );
  }
);
SelectCurrency.displayName = "SelectCurrency";

export default SelectCurrency;
