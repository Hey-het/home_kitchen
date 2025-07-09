import Link from "next/link";
import { cookies } from "next/headers";
import { ShoppingCartIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Search from "./Search";


export default async function NavBar({ orderSumbit,products }) {

  const cookieStore = await cookies();
  const sessionId = cookieStore.get("session_id")?.value;

  const profile = "/profile/" + sessionId;  // replaced userId with sessionId

  const items = typeof orderSumbit === "function" ? await orderSumbit() : orderSumbit;

  const totalItems = Array.isArray(items)
    ? items.reduce((acc, item) => acc + Number(item.quantity || 1), 0)
    : 0;

  return (
    <header className="border-b border-b-gray-300 bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-8">
        {/* Left side nav */}
        <div className="flex justify-center gap-6">
          <Link href="/" className="font-semibold hover:underline ml-2 mr-2">
            Home
          </Link>
          <Link href="/menu" className="font-semibold hover:underline ml-2 mr-2">
            Products
          </Link>
        </div>

        {/* Right side nav */}
        <div className="flex items-center gap-4 ">
          {/* Search icon (first) */}
          <Search  products={products}/>

          {/* Cart (second) */}
          <Link href="/cart" className="relative inline-block">
            <ShoppingCartIcon className="h-6 w-6" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-2 bg-green-600 text-white text-xs font-bold rounded-full px-2 py-0.5 min-w-[1.25rem] text-center">
                {totalItems}
              </span>
            )}
          </Link>
        </div>


      </div>
    </header>
  );
}
