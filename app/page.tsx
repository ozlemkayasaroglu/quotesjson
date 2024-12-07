"use client";
import QuoteBar from "@/components/QuoteBar";

export default function Home() {
  return (
    <div
      className="h-screen flex flex-col justify-center items-center bg-cover"
      style={{ backgroundImage: 'url("/background.webp")' }}
    >
      <QuoteBar />
    </div>
  );
}
