"use client";
import { useRouter, useSearchParams } from "next/navigation";

export default function RegionProduct() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (e) => {
    const value = e.target.value;
    const sort = searchParams.get("sort") || "";
    router.push(`/menu?region=${value}&sort=${sort}`);
  };

  return (
    <select onChange={handleChange} className="border px-4 py-2 font-bold">
      <option value="">All</option>
      <option value="North-Indian">North Indian</option>
      <option value="South-Indian">South Indian</option>
      <option value="Sweet">Sweet</option>
      <option value="Starter">Starter</option>
    </select>
  );
}
