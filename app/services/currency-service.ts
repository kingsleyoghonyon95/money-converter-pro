import { CurrencyConversionResponse } from '../types/currency';


export async function convertCurrency(
  fromCurrency: string,
  toCurrency: string,
  amount: number
): Promise<CurrencyConversionResponse> {
  const response = await fetch(
    `https://api.frankfurter.app/latest?from=${fromCurrency}&to=${toCurrency}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch exchange rate');
  }

  const data = await response.json();

  const exchangeRate = data.rates[toCurrency];

  return {
    convertedAmount: amount * exchangeRate,
    exchangeRate,
  };
}