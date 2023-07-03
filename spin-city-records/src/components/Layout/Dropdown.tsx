import { useEffect, useState } from "react";

interface Currency {
  code: string;
  flag: string;
  alt: string;
}

const currencies: Currency[] = [
  { code: "USD", flag: "/us.svg", alt: "USD Flag" },
  { code: "EUR", flag: "/eu.svg", alt: "EUR Flag" },
  { code: "GBP", flag: "/gb.svg", alt: "GBP Flag" },
];

const Dropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState<
    Currency | undefined
  >(currencies[0]);

  const handleSelectCurrency = (currency: Currency) => {
    setSelectedCurrency(currency);
    setIsOpen(false);
    // You can also perform other actions here based on the selected currency
  };

  useEffect(() => {
    setSelectedCurrency(currencies[0]);
  }, []);

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 shadow-sm focus:outline-none"
          id="options-menu"
          aria-haspopup="true"
          aria-expanded="true"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedCurrency && (
            <div className="h-10 w-10">
              <img
                src={selectedCurrency.flag}
                alt={selectedCurrency.alt}
                className="h-full w-full"
              />
            </div>
          )}
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {currencies.map((currency) => (
              <div
                key={currency.code}
                className="cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-300"
                role="menuitem"
                onClick={() => handleSelectCurrency(currency)}
              >
                <img
                  src={currency.flag}
                  alt={currency.alt}
                  className="mr-2 inline h-6 w-6"
                />
                {currency.code}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
