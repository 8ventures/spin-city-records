import React from 'react';
import * as Select from '@radix-ui/react-select';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { SelectItem } from '../../components/selectItem'
import type { ControllerRenderProps } from 'react-hook-form/dist/types';
import type { Album } from './SearchAlbumsForm';

type selectCurrencyProps = {
  field: ControllerRenderProps<{
    price: number;
    currency: string;
    weight: string;
    format: string;
    description: string;
    condition: string;
    speed: string;
    album: Album;
    editions: {value: string}[];
}, "currency">
}
const SelectCurrency  = React.forwardRef<HTMLButtonElement, selectCurrencyProps>(
  ({field}, forwardedRef) => {
    return (
      <Select.Root onValueChange={field.onChange} name={field.name} value={field.value}>
        <Select.Trigger
          className="inline-flex bg-white text-black items-center justify-center rounded-xl px-[15px] text-xl leading-none h-fit py-2 gap-[5px] outline-none"
          aria-label="Condition"
          ref={forwardedRef}
        >
          <Select.Value placeholder="Select Currency" />
          <Select.Icon className="">
            <ChevronDownIcon />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content className="overflow-hidden bg-white rounded-xl">
            <Select.Viewport className="p-[5px]">
              <Select.Group>
                <SelectItem value="gbp">GBP</SelectItem>
                <SelectItem value="eur">EUR</SelectItem>
                <SelectItem value="usd">USD</SelectItem>
              </Select.Group>
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    )
  }
)
SelectCurrency.displayName = 'SelectCurrency';

export default SelectCurrency;
