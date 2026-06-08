"use client";

import { useEffect, useState } from "react";
import { getCurrencies } from "../services/get-currencies";

export default function CurrencyConverter() {
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
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
    <div className="w-full max-w-md space-y-4">
      <h1 className="text-2xl font-bold">Currency Converter</h1>

      <div className="flex gap-2 items-center">
        <select
          className="border p-2 w-1/3"
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
        >
          {Object.entries(currencies).map(([code, name]) => (
            <option key={code} value={code}>
              {code} - {name}
            </option>
          ))}
        </select>

        <span>→</span>

        <select
          className="border p-2 w-1/3"
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
        >
          {Object.entries(currencies).map(([code, name]) => (
            <option key={code} value={code}>
              {code} - {name}
            </option>
          ))}
        </select>
      </div>

      <input
        className="border p-2 w-full"
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />

      <button
        className="bg-black text-white px-4 py-2 rounded w-full"
        onClick={handleConvert}
      >
        Convert
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