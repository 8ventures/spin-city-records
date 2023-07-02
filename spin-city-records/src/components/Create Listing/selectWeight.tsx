import React from 'react';
import * as Select from '@radix-ui/react-select';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { SelectItem } from '../../components/selectItem'
import type { ControllerRenderProps } from 'react-hook-form/dist/types/controller';

type selectWeightProps = {
  field: ControllerRenderProps<{
    price: number;
    currency: string;
    weight: string;
    format: string;
    description: string;
    condition: string;
    speed: string;
    albumId: string;
    editions: {value: string}[];
  }, "weight">
}

const SelectWeight = React.forwardRef<HTMLButtonElement, selectWeightProps>(
  ({field}, forwardRef) => {

    return (
      <Select.Root onValueChange={field.onChange} name={field.name} value={field.value}>
        <Select.Trigger
          className="inline-flex bg-white text-black items-center justify-center rounded-xl px-[15px] text-xl leading-none h-fit py-2 gap-[5px] outline-none"
          aria-label="Weight"
          ref={forwardRef}
        >
          <Select.Value placeholder="Select Weight" />
          <Select.Icon className="">
            <ChevronDownIcon />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content className="overflow-hidden bg-white rounded-xl">
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