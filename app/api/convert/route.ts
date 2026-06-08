import { convertCurrency } from "../../services/currency-service";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { fromCurrency, toCurrency, amount } = body;

    const result = await convertCurrency(
      fromCurrency,
      toCurrency,
      amount
    );

    return Response.json(result);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Something went wrong";

    return Response.json(
      { error: message },
      { status: 500 }
    );
  }
}