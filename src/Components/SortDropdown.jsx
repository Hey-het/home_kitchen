"use client";
import { useRouter, useSearchParams } from "next/navigation";

export default function SortDropdown() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (e) => {
    const value = e.target.value;
    const region = searchParams.get("region") || "";
    router.push(`/menu?sort=${value}&region=${region}`);
  };

  return (
    <select onChange={handleChange} className="border px-4 py-2 font-bold mr-5">
      <option value="">Sort</option>
      <option value="a-z">A-Z</option>
      <option value="z-a">Z-A</option>
      <option value="low-price">Low to High</option>
      <option value="high-price">High to Low</option>
    </select>
  );
}
