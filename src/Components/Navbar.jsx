import Link from "next/link";
import {
  UserButton,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

export default async function NavBar() {
  const { userId } = await auth();
  const profile = "/profile/" + userId;

  return (
    <header className="border-b bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Left side nav */}
        <div className="flex items-center gap-6">
          <Link href="/" className="text-lg font-semibold text-gray-800 hover:text-blue-600">
            Home
          </Link>
          <Link href="/menu" className="text-lg font-semibold text-gray-800 hover:text-blue-600">
            Menu
          </Link>
        </div>

        {/* Right side nav */}
        <div className="flex items-center gap-4">
          {/* Cart */}
          <div className="relative group">
            <button className="relative p-2 hover:text-gray-700 transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.3 2.3c-.6.6-.2 1.7.7 1.7H17m0 0a2 2 0 100 4 2 2 0 000-4m-8 2a2 2 0 11-4 0 2 2 0 014 0" />
              </svg>
              <span className="absolute -top-1 -right-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                8
              </span>
            </button>

            {/* Cart dropdown */}
            <div className="absolute right-0 z-20 mt-2 hidden w-64 rounded-md border bg-white p-4 shadow-md group-hover:block transition">
              <p className="text-lg font-semibold">8 Items</p>
              <p className="text-sm text-gray-600">Subtotal: $999</p>
              <Link href="/cart">
                <button className="mt-3 w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 text-sm">
                  View Cart
                </button>
              </Link>
            </div>
          </div>

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