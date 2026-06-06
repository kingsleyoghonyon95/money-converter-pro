
export interface CurrencyConversionRequest {
    fromCurrency: string;
    toCurrency: string;
    amount: number;
}

export interface CurrencyConversionResponse {
    convertedAmount: number;
    exchangeRate: number;
}