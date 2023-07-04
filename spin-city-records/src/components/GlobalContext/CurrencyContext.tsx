import React, { createContext, useState, useEffect } from "react";

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

  useEffect(() => {
    const localData = window.localStorage.getItem("currency");
    if (localData) {
      setCurrency(JSON.parse(localData));
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("currency", JSON.stringify(currency));
  }, [currency]);

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
