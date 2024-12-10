"use client";
import { useState } from "react";
import QuoteBar from "@/components/QuoteBar";
import Image from "next/image";

export default function Home() {
  const [category, setCategory] = useState<string>("New Year");

  const handleCategoryChange = (newCategory: string) => {
    console.log("category change to:", newCategory);
    setCategory(newCategory);
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
        className="h-screen flex flex-col justify-center items-center bg-cover"
        style={{ backgroundImage: getBackgroundImage(category) }}
      >
        <Image
          src="/xmas_hat.webp"
          alt="Christmas Hat"
          width={500}
          height={300}
          className="absolute top-0  xs:translate-y-[58%] xs:translate-x-[-19%] "
        />
        <QuoteBar onCategoryChange={handleCategoryChange} />
      </div>
    </>
  );
}
