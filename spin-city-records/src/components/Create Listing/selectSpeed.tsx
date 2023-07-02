import React from 'react';
import * as Select from '@radix-ui/react-select';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { SelectItem } from '../selectItem'
import type { ControllerRenderProps } from 'react-hook-form/dist/types/controller';

type selectSpeedProps = {
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
  }, "speed">
}

const SelectSpeed = React.forwardRef<HTMLButtonElement, selectSpeedProps> (
  ({field}, forwardedRef) => {

    return (
      <Select.Root onValueChange={field.onChange} name={field.name} value={field.value}>
        <Select.Trigger
          className="inline-flex bg-white text-black items-center justify-center rounded-xl px-[15px] text-xl leading-none h-fit py-2 gap-[5px] outline-none"
          aria-label="Speed"
          ref={forwardedRef}
        >
          <Select.Value placeholder="Select Speed" />
          <Select.Icon className="">
            <ChevronDownIcon />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content className="overflow-hidden bg-white rounded-xl">
            <Select.Viewport className="p-[5px]">
              <Select.Group>
                <SelectItem value="33 1/3 RPM">33 1/3 RPM</SelectItem>
                <SelectItem value="45 RPM">45 RPM</SelectItem>
                <SelectItem value="78 RPM">78 RPM</SelectItem>
              </Select.Group>
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    )
  }
)

SelectSpeed.displayName = 'SelectSpeed'

export default SelectSpeed