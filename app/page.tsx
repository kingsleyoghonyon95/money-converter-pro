import Image from "next/image";
import CurrencyConverter from "./components/CurrencyConverter";


export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center">
      <div className="text-center -translate-y-32">
        <Image className=" ml-4 mb-4 rounded-full shadow-lg"
          src="/worldmap.jpeg"
          alt="World Map"
          width={200}
          height={200}
        />
        <h1 className="text-4xl font-bold">
          Welcome to Money Converter Pro!
        </h1>

        <p className="mt-4 text-lg text-gray-600">
          Convert currencies with prevailing exchange rates.
        </p>

        <div className="mt-8">
          <CurrencyConverter />
        </div>
      </div>
    </main>
  );
}