"use client";

import { useEffect, useState } from "react";
import { getCurrencies } from "../services/get-currencies";

export default function CurrencyConverter() {
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [amount, setAmount] = useState(1);
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currencies, setCurrencies] = useState<Record<string, string>>({});

  useEffect(() => {
    async function loadCurrencies() {
      try {
        const data = await getCurrencies();
        setCurrencies(data);
      } catch (err) {
        console.error(err);
      }
    }

    loadCurrencies();
  }, []);

  const handleConvert = async () => {
    try {
      const response = await fetch("/api/convert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fromCurrency,
          toCurrency,
          amount,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data.convertedAmount);
        setError(null);
      } else {
        setError(data.error || "Conversion failed");
        setResult(null);
      }
    } catch (err) {
      console.error("Error:", err);
      setError("An error occurred during conversion");
      setResult(null);
    }
  };

  return (
    <div className="border-2 border-gray-400 rounded-lg p-4 space-y-4 w-full max-w-xl">
      <h1 className="text-2xl font-bold">Currency Converter</h1>

      <div className="border border-gray-300 rounded-md p-3">
        <div className="flex gap-2 items-center">
          <select
            className="border border-gray-300 p-2 flex-1 rounded-md text-sm"
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
          >
            <option value="" disabled>
              From currency
            </option>
            {Object.entries(currencies).map(([code, name]) => (
              <option key={code} value={code}>
                {code} - {name}
              </option>
            ))}
          </select>

          <span className="text-xl font-bold">→</span>

          <select
            className="border border-gray-300 p-2 flex-1 rounded-md text-sm"
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
          >
            <option value="" disabled>
              To currency
            </option>
            {Object.entries(currencies).map(([code, name]) => (
              <option key={code} value={code}>
                {code} - {name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <input
        className="border border-gray-300 p-2 w-full rounded-md text-sm"
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />

      <button
        className="bg-black text-white px-4 py-2 rounded w-full"
        onClick={handleConvert}
      >
        Click to Convert
      </button>

      {result !== null && (
        <div className="text-green-600 font-semibold">
          {amount} {fromCurrency} = {result.toFixed(2)} {toCurrency}
        </div>
      )}

      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
}