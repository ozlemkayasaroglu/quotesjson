import React from "react";
import { useState, useEffect } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Ranchers, Sour_Gummy } from "next/font/google";
import { Mountains_of_Christmas } from "next/font/google";
import TweetButton from "./TweetButton";
import Image from "next/image";

interface Quote {
  category: string;
  quote: string;
  author: string;
}

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

interface TextBarProps {
  onCategoryChange: (category: string) => void;
}

interface Quote {
  category: string;
  quote: string;
  author: string;
}

const gummy = Sour_Gummy({
  subsets: ["latin"],
  weight: "400",
});

const xmas = Mountains_of_Christmas({
  subsets: ["latin"],
  weight: "700",
});

const ranchers = Ranchers({
  subsets: ["latin"],
  weight: "400",
});

const categories = ["New Year"];
const categoryTranslations: { [key: string]: string } = {
  // beauty: "güzellik",
  // birthday: "doğum günü",
  // love: "aşk",
  "New Year": "yeni yıl",
};

function textBar({ onCategoryChange }: TextBarProps) {
  const [data, setData] = useState<Quote[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [category, setCategory] = useState<string>("New Year");
  const [open, setOpen] = useState(false);
  const [randomQuote, setRandomQuote] = useState<Quote | null>(null);
  const [language, setLanguage] = useState<string>("TR");

  const handleCategorySelect = (newCategory: string) => {
    setCategory(newCategory);
    onCategoryChange(newCategory);
  };

  const fetchQuotes = async (selectedCategory: string): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const fileName =
        language === "TR" ? "/json/quotesTR.json" : "/json/quotes.json";
      const response = await fetch(fileName);

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const quotes: Quote[] = await response.json();
      const filteredQuotes = quotes.filter(
        (quote) => quote.category === selectedCategory
      );

      const randomQuote =
        filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)];
      setRandomQuote(randomQuote);

      setData(filteredQuotes);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Bilinmeyen bir hata oluştu");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotes(category);
  }, [category, language]);

  const getCategoryLabel = (category: string): string => {
    if (language === "TR") {
      return categoryTranslations[category] || category;
    }
    return category;
  };

  return (
    <>
      <div className="flex-col istems-center justify-center relative">
        <Image
          src="/xmas_hat.webp"
          alt="Christmas Hat"
          width={500}
          height={300}
          className="absolute md:top-[-90px] md:left-[-110px] top-[-70px] left-[-90px]"
        />
        <div className="bg-green-900 bg-opacity-20 md:w-[400px] w-[300px] rounded-lg text-center min-h-96 border-4 border-gray-300 shadow-2xl">
          <div className="border-b-4 border-gray-300">
            <div className="justify-center flex m-3 mt-6 mb-6 ">
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  {/* <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="fill-current text-black w-4 hover:text-rose-500 lg:w-8"
                  >
                    <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                  </svg> */}

                  <p
                    className={`${xmas.className} text-gray-700 font-bold uppercase text-2xl`}
                  >
                    {language === "TR" ? "Günlük" : "daily dose of"}
                    <span
                      className={`${xmas.className} text-rose-700 pr-1 rounded ml-1 `}
                    >
                      {categoryTranslations[category] || category}
                    </span>
                    {language === "TR" ? "dozu" : ""}
                  </p>
                </PopoverTrigger>
                {/* <PopoverContent className=" w-[200px] p-0">
              <Command className="">
                <CommandList>
                  <CommandGroup className="">
                    {categories.map((cat) => (
                      <CommandItem
                        key={cat}
                        value={cat}
                        onSelect={() => {
                          handleCategorySelect(cat);
                          setCategory(cat);
                          setOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            category === cat ? "opacity-100" : "opacity-0"
                          )}
                        />

                        {getCategoryLabel(cat)}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent> */}
              </Popover>
            </div>
          </div>
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="animate-spin h-10 w-10 text-gray-500"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" strokeOpacity="0.3" />
                <path d="M12 2a10 10 0 0 1 10 10" />
              </svg>
            </div>
          ) : error ? (
            <div>Error: {error}</div>
          ) : (
            randomQuote && (
              <div className="m-10 text-start  ">
                <p
                  className={`${gummy.className}  text-center text-2xl text-gray-700 mb-4 leading-normal `}
                >
                  {randomQuote.quote}
                </p>
                {/* <p
              className={`${gummy.className} text-lg  capitalize text-black-950 font-bold`}
            > */}
                {/* {randomQuote.author} */}
                {/* </p> */}
              </div>
            )
          )}
        </div>
        <div>
          {randomQuote && (
            <TweetButton quote={randomQuote.quote} url="localhost:3000" />
          )}
        </div>
      </div>
    </>
  );
}

export default textBar;
