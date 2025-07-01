import Link from "next/link";
import {
  UserButton,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";



export default async function NavBar({orderSumbit}) {
  const { userId } = await auth();
  const profile = "/profile/" + userId;
  // const cartItems = await getCartItems(userId); 

   const items = typeof orderSumbit === "function" ? await orderSumbit() : orderSumbit;
    const totalItems = Array.isArray(items)
        ? items.reduce((acc, item) => acc + Number(item.quantity || 1), 0)
        : 0;
   
  

  return (
    <header className="border-b bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Left side nav */}
        <div className="flex items-center gap-6">
          <Link href="/" className="font-semibold hover:underline  ml-2 mr-2 ">
            Home
          </Link>
          <Link href="/menu" className=" font-semibold hover:underline  ml-2 mr-2 ">
            Products
          </Link>
        </div>

        {/* Right side nav */}
        <div className="flex items-center gap-4">
          {/* Cart */}
          {/* <CartCount /> */}
           {/* <CartCount cartCount={orderSumbit} /> */}
            <Link
                href="/cart"
                className="relative inline-block"
            >
                <ShoppingCartIcon className="h-6 w-6" />
                {totalItems > 0 && (
                    <span className="absolute -top-1 -right-2 bg-green-600 text-white text-xs font-bold rounded-full px-2 py-0.5 min-w-[1.25rem] text-center">
                        {totalItems}
                    </span>
                )}
            </Link>

        
          {/* Profile */}
          <div className="relative group">
            <button className="h-10 w-10 overflow-hidden rounded-full border border-gray-300 transition">
              <img
                alt="User avatar"
                src="https://cdn.sumup.store/shops/81731664/settings/th240/11f10fe2-e928-4c55-9da0-c1a9ebed8a68.jpeg"
                className="h-full w-full object-cover"
              />
            </button>

            <div className="absolute right-0 z-20 mt-2 hidden w-40 rounded-md border bg-white p-2 shadow-md group-hover:block transition">
              <Link href={profile}>
                <div className="flex justify-between items-center px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer">
                  <span>Profile</span>
                  <span className="ml-2 rounded bg-green-100 px-2 py-0.5 text-xs text-green-800">New</span>
                </div>
              </Link>
            </div>
          </div>

          {/* Auth Buttons */}
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <button className="rounded-md border px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton>
              <button className="rounded-md border px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Sign Up
              </button>
            </SignUpButton>
          </SignedOut>
        </div>
      </div>
    </header>
  );
}