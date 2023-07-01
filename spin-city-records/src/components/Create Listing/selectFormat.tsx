import React from 'react';
import * as Select from '@radix-ui/react-select';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { SelectItem } from '../../components/selectItem'
import type { ControllerRenderProps } from 'react-hook-form/dist/types/controller';

type selectFormatProps = {
  field: ControllerRenderProps<{
    price: number;
    currency: string;
    weight: string;
    format: string;
    description: string;
    condition: string;
    speed: string;
    albumId: string;
    editions: string;
  }, "format">
}

const SelectFormat = React.forwardRef<HTMLButtonElement, selectFormatProps>(
  ({field}, forwardedRef) => {

    return (
      <Select.Root onValueChange={field.onChange} name={field.name} value={field.value}>
        <Select.Trigger
          className="inline-flex bg-white text-black items-center justify-center rounded-xl px-[15px] text-xl leading-none h-fit py-2 gap-[5px] outline-none"
          aria-label="Format"
          ref={forwardedRef}
        >
          <Select.Value placeholder="Select Format" />
          <Select.Icon className="">
            <ChevronDownIcon />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content className="overflow-hidden bg-white rounded-xl">
            <Select.Viewport className="p-[5px]">
              <Select.Group>
                <SelectItem value="7&quot;">7&quot;</SelectItem>
                <SelectItem value="10&quot;">10&quot;</SelectItem>
                <SelectItem value="12&quot;">12&quot;</SelectItem>
              </Select.Group>
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    )
  }
)

SelectFormat.displayName = 'SelectFormat';

export default SelectFormat