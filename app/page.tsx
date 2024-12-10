"use client";
import { useState } from "react";
import QuoteBar from "@/components/QuoteBar";
import Image from "next/image";
import TweetButton from "@/components/TweetButton";

export default function Home() {
  const [category, setCategory] = useState<string>("New Year");
  const [currentQuote, setCurrentQuote] = useState<string>("");

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
  };

  const handleQuoteChange = (quote: string) => {
    setCurrentQuote(quote);
  };

  const getBackgroundImage = (selectedCategory: string): string => {
    console.log(selectedCategory);
    switch (selectedCategory) {
      case "love":
      case "aşk":
        return "url('/love.webp')";
      case "beauty":
      case "güzellik":
        return "url('/background.webp')";
      case "birthday":
      case "doğum günü":
        return "url('/birthday.webp')";
      case "New Year":
      case "yeni yıl":
        return "url('/new_year.webp')";
      default:
        return "url('/background.webp')";
    }
  };

  return (
    <>
      <div
        className="h-screen flex flex-col justify-center items-center bg-cover "
        style={{ backgroundImage: getBackgroundImage(category) }}
      >
        <QuoteBar
          onCategoryChange={handleCategoryChange}
          onQouteChange={handleQuoteChange}
        />
      </div>
      {currentQuote && (
        <div className="mt-4">
          <TweetButton
            quote={currentQuote}
            url="localhost:3000"
            image="http://ozlem.kayasaroglu.com/wp-content/uploads/2024/12/Mutlu-Seneler.png" // Görsel URL'si
          />
        </div>
      )}
    </>
  );
}
