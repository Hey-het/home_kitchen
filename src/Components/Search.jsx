"use client";

import { useState } from "react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export default function Search({ products }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

 function handleSearch() {
    //   console.log("Searching for:", query);
  if (!products || products.length === 0) {
    alert("No products available");
    return;
  }
  const result = products.find((item) =>
    item.prod_name.toLowerCase().includes(query.toLowerCase().trim())
  );

  if (result) {
    router.push(`/menu/${result.route_name}`);
    setIsOpen(false);
    setQuery("");
  } else {
    alert("Product not found");
  }
}


  return (
    <>
      {!isOpen ? (
        <button onClick={() => setIsOpen(true)} aria-label="Open Search">
          <MagnifyingGlassIcon className="h-6 w-6 text-black" />
        </button>
      ) : (
        <>
          {/* Search Bar */}
          <div className="fixed top-4 left-1/2 -translate-x-1/2 w-[100%] md:w-3/4 lg:w-1/2 z-50 flex items-center border border-gray-300 rounded-md bg-white px-4 py-2 shadow-lg">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-600 mr-2" />
            <input
              type="text"
              placeholder="Search"
              className="flex-grow outline-none text-sm pb-2 pt-2 w-full"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
              autoFocus
            />
          </div>

          {/* X button */}
          <button
            onClick={() => {
                            setIsOpen(false);
                            setQuery("");
                             }}
            aria-label="Close Search"
            // className="fixed top-4 right-4 z-50"
          >
            <XMarkIcon className="w-6 text-black" />
          </button>
        </>
      )}
    </>
  );
}
