import React, { useEffect, useState, useContext, useRef } from "react";
import { CurrencyContext } from "../GlobalContext/CurrencyContext";

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
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>();
  const { currency, setCurrency } = useContext(CurrencyContext);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelectCurrency = (ccy: Currency) => {
    setSelectedCurrency(ccy);
    setIsOpen(false);
    setCurrency(ccy.code);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const matchingCurrency = currencies.find((ccy) => ccy.code === currency);
    if (matchingCurrency) {
      setSelectedCurrency(matchingCurrency);
    }
  }, [currency]);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left " ref={dropdownRef}>
      <div>
        <button
          type="button"
          className="inline-flex items-center justify-center focus:outline-none "
          id="options-menu"
          aria-haspopup="true"
          aria-expanded="true"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedCurrency && (
            <div className=" w-8  ">
              <img
                src={selectedCurrency.flag}
                alt={selectedCurrency.alt}
                className="w-full rounded-sm "
              />
            </div>
          )}
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-0 z-50 mt-3 w-56 origin-top-right scale-100 border transform border-gray-700 rounded-md bg-black opacity-100 shadow-lg ring-1 ring-black ring-opacity-5 transition duration-100 ease-out">
          <div
            className="py-0"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {currencies.map((ccy, index) => (
              <div
                key={ccy.code}
                className={`cursor-pointer px-4 py-2 text-sm text-white hover:bg-gray-800 ${
                  index < currencies.length - 1
                    ? "border-b border-gray-800"
                    : ""
                }`}
                role="menuitem"
                onClick={() => handleSelectCurrency(ccy)}
              >
                <img
                  src={ccy.flag}
                  alt={ccy.alt}
                  className="mr-3 inline h-5 w-7 rounded-lg"
                />
                <span className="font-semibold">{ccy.code}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
