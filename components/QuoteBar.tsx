import React from "react";
import { useState, useEffect } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Ranchers } from "next/font/google";
import { Sour_Gummy } from "next/font/google";

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

const ranchers = Ranchers({
  subsets: ["latin"],
  weight: "400",
});
const gummy = Sour_Gummy({
  subsets: ["latin"],
  weight: "400",
});

const categories = [
  "beauty",
  "computer",
  "birthday",
  "dating",
  "equality",
  "family",
  "fitness",
  "love",
  "morning",
  "success",
];
function textBar() {
  const [data, setData] = useState<Quote[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [category, setCategory] = useState<string>("love");
  const [open, setOpen] = useState(false);
  const [randomQuote, setRandomQuote] = useState<Quote | null>(null);

  const fetchQuotes = async (selectedCategory: string): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/json/quotes.json`);

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
  }, [category]);
  return (
    <div className="items-center justify-center bg-rose-300 rounded-lg text-center min-h-96 w-[450px] border-4 border-black xs:w-[300px]">
      <div className="border-b-4 border-black w-[446px] xs:w-[295px] relative">
        <div className="justify-between flex m-5">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <div className="">
                <div className="curser-pointer flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="fill-current text-black w-4 hover:text-rose-500"
                  >
                    <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                  </svg>
                  <p className="text-black font-bold uppercase ml-2 ">
                    daily dose of
                  </p>
                  <p
                    className={`${ranchers.className}font-bold text-rose-800 uppercase ml-2`}
                  >
                    {category}
                  </p>
                </div>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search category..." />
                <CommandList>
                  <CommandEmpty>No categories found.</CommandEmpty>
                  <CommandGroup>
                    {categories.map((cat) => (
                      <CommandItem
                        key={cat}
                        value={cat}
                        onSelect={() => {
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
                        {cat}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <div className="items-end justify-end flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
              className="fill-current text-black w-4 "
            >
              <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
            </svg>
          </div>
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
          <div className="m-10 text-start xs:m-5">
            <p
              className={`${gummy.className} xs:text-lg text-2xl text-gray-800 mb-4 leading-normal `}
            >
              {randomQuote.quote}
            </p>
            <p
              className={`${gummy.className} text-lg uppercase text-black-950 font-bold`}
            >
              {randomQuote.author}
            </p>
          </div>
        )
      )}
    </div>
  );
}

export default textBar;
