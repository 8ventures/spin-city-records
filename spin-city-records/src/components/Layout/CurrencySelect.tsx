import * as Select from "@radix-ui/react-select";
import { useState } from "react";

interface Currency {
  symbol: string;
  flag: string;
}

const currencies: { [key: string]: Currency } = {
  euro: { symbol: "EUR", flag: "🇪🇺" },
  pound: { symbol: "GBP", flag: "🇬🇧" },
  dollar: { symbol: "USD", flag: "🇺🇸" },
  yen: { symbol: "JPY", flag: "🇯🇵" },
  rupee: { symbol: "INR", flag: "🇮🇳" },
  yuan: { symbol: "CNY", flag: "🇨🇳" },
};

export default function CurrencySelect() {
  const [value, setValue] = useState(currencies.euro?.flag);

  return (
    <Select.Root value={value} onValueChange={setValue}>
      <Select.Trigger>
        <Select.Value aria-label={value} style={{ color: "red" }}>
          {value}
        </Select.Value>
        <Select.Icon />
      </Select.Trigger>
      <Select.Portal>
        <Select.Content>
          <Select.Viewport>
            {Object.entries(currencies).map(([key, currency]) => (
              <Select.Item key={key} value={key}>
                <Select.ItemText>{key}</Select.ItemText>
                <Select.ItemIndicator>{currency.flag}</Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
