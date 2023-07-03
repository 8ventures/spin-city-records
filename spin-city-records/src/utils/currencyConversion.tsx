interface ConversionRates {
  [key: string]: number;
}

const conversionRates: ConversionRates = {
  USD: 1, // Conversion rate to USD
  EUR: 1 / 0.9, // Conversion rate to EUR
  GBP: 1 / 0.75, // Conversion rate to GBP
};

const convertToGlobalCurrency = (
  price: number,
  currency: string,
  globalCurrency: string
): number => {
  const currencyRate = conversionRates[currency];
  const globalCurrencyRate = conversionRates[globalCurrency];

  if (currencyRate !== undefined && globalCurrencyRate !== undefined) {
    const conversionRate = currencyRate / globalCurrencyRate;
    const convertedPrice = price * conversionRate;
    return Number(convertedPrice.toFixed(2));
  }

  return 0.0;
};

export default convertToGlobalCurrency;
