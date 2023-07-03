import React, { createContext, useState } from "react";

interface CurrencyContextType {
  currency: string;
  setCurrency: (newCurrency: string) => void;
}

interface CurrencyProviderProps {
  children: React.ReactNode;
}

export const CurrencyContext = createContext<CurrencyContextType>({
  currency: "USD",
  setCurrency: () => {},
});

export const CurrencyProvider: React.FC<CurrencyProviderProps> = ({
  children,
}) => {
  const [currency, setCurrency] = useState<string>("USD");

  const handleSetCurrency = (newCurrency: string) => {
    setCurrency(newCurrency);
  };

  const currencyContextValue: CurrencyContextType = {
    currency,
    setCurrency: handleSetCurrency,
  };

  return (
    <CurrencyContext.Provider value={currencyContextValue}>
      {children}
    </CurrencyContext.Provider>
  );
};
