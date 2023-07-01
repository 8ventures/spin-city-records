import React from 'react';
import * as Select from '@radix-ui/react-select';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { SelectItem } from '../../components/selectItem'

export default function SelectFormat () {

  return (
    <Select.Root>
      <Select.Trigger
        className="inline-flex bg-white text-black items-center justify-center rounded-xl px-[15px] text-xl leading-none h-fit py-2 gap-[5px] outline-none"
        aria-label="Format"
      >
        <Select.Value placeholder="Select format..." />
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