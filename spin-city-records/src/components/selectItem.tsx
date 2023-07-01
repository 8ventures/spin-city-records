import React from 'react'
import { cn } from '~/utils/cn';
import * as Select from '@radix-ui/react-select'
import { CheckIcon } from '@radix-ui/react-icons';

export const SelectItem = React.forwardRef<HTMLLIElement, { value: string; children: React.ReactNode; className?: string }>(
  ({ children, className, ...props }, forwardedRef) => {
  return (
    <Select.Item
      className={cn(
        'text-xl my-2 leading-none flex items-center h-[25px] pr-[35px] pl-[25px] relative',
        className
      )}
      {...props}
      ref={forwardedRef as React.Ref<HTMLDivElement>}
    >
      <Select.ItemText>{children}</Select.ItemText>
      <Select.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
        <CheckIcon />
      </Select.ItemIndicator>
    </Select.Item>
  );
});

SelectItem.displayName = 'SelectItem'