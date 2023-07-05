import React from 'react';
import * as Select from '@radix-ui/react-select';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { SelectItem } from '../../components/selectItem'
import type { ControllerRenderProps } from 'react-hook-form/dist/types';

type selectLocationProps = {
  field: ControllerRenderProps<{
    name: string;
    bio: string;
    location: string;
}, "location">
}
const SelectLocation  = React.forwardRef<HTMLButtonElement, selectLocationProps>(
  ({field}, forwardedRef) => {
    return (
      <Select.Root onValueChange={field.onChange} name={field.name} value={field.value}>
        <Select.Trigger
          className="inline-flex bg-black text-gray-300 items-center justify-center rounded-xl px-[15px] text-xl leading-none h-fit py-2 gap-[5px] outline-none"
          aria-label="Location"
          ref={forwardedRef}
        >
          <Select.Value placeholder="Select Location" />
          <Select.Icon className="text-custom-orange">
            <ChevronDownIcon />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content className="overflow-hidden bg-black text-gray-300 rounded-xl">
            <Select.Viewport className="p-[5px]">
              <Select.Group>
                <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                <SelectItem value="United States">United States</SelectItem>
                <SelectItem value="Europe">Europe</SelectItem>
              </Select.Group>
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    )
  }
)
SelectLocation.displayName = 'SelectLocation';

export default SelectLocation;
