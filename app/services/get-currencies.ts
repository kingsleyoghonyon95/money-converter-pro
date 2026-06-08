export async function getCurrencies() {
  const res = await fetch("/api/currencies");

  if (!res.ok) {
    throw new Error("Failed to fetch currencies");
  }

  return res.json();
}