"use client";

import { useRouter } from "next/navigation";

export default function SortDropdown() {
  const router = useRouter();

  const handleChange = (e) => {
    const value = e.target.value;
    router.push(`/menu?sort=${value}`);
  };

  return (
    <select onChange={handleChange} className="border border-gray-300 font-bold px-4 py-2 w-3xs mr-5">
      <option value="a-z">Name A–Z</option>
      <option value="z-a">Name Z–A</option>
      <option value="low-price">Lowest Price</option>
      <option value="high-price">Highest Price</option>
    </select>
  );
}
