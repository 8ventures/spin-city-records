import React from 'react';
import * as Select from '@radix-ui/react-select';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { SelectItem } from '../selectItem'

export default function SelectSpeed () {

  return (
    <Select.Root>
      <Select.Trigger
        className="inline-flex bg-white text-black items-center justify-center rounded-xl px-[15px] text-xl leading-none h-fit py-2 gap-[5px] outline-none"
        aria-label="Speed"
      >
        <Select.Value placeholder="Select a speed..." />
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