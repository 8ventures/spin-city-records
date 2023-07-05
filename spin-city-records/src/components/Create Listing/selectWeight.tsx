import React from 'react';
import * as Select from '@radix-ui/react-select';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { SelectItem } from '../../components/selectItem'
import type { ControllerRenderProps } from 'react-hook-form/dist/types/controller';
import type { Album } from './SearchAlbumsForm';

type selectWeightProps = {
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
  }, "weight">
}

const SelectWeight = React.forwardRef<HTMLButtonElement, selectWeightProps>(
  ({field}, forwardRef) => {

    return (
      <Select.Root onValueChange={field.onChange} name={field.name} value={field.value}>
        <Select.Trigger
          className="inline-flex  bg-black text-gray-300 items-center justify-center rounded-xl px-[15px] text-xl leading-none h-fit py-2 gap-[5px] outline-none"
          aria-label="Weight"
          ref={forwardRef}
        >
          <Select.Value placeholder="Select Weight" />
          <Select.Icon className="text-custom-orange">
            <ChevronDownIcon />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content className="cursor-pointer overflow-hidden bg-black text-gray-300 rounded-xl">
            <Select.Viewport className="p-[5px]">
              <Select.Group>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="180">180 g</SelectItem>
              </Select.Group>
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    )
  }
)

SelectWeight.displayName = 'SelectWeight'

export default SelectWeight