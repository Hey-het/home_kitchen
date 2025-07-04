import NavBar from "@/Components/Navbar";
import Image from "next/image";
import Link from "next/link";
import { } from "@heroicons/react/24/outline";

export default function homePage() {
  return (
    <>
      {/* <NavBar/> */}
      <div className="relative w-full h-[300px] sm:h-[500px] md:h-[600px]">
        <img
          src="https://cdn.sumup.store/shops/81731664/settings/th240/11f10fe2-e928-4c55-9da0-c1a9ebed8a68.jpeg"
          className="w-full h-full object-cover blur-xs"
          alt="Hetal's Home Kitchen Logo"
        />
        <div className="absolute inset-0 flex items-center justify-center flex-col text-center px-4">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-semibold text-white pb-6">
            Hetal&apos;s Home Kitchen!
          </h1>
          <p className="text-sm sm:text-lg md:text-xl font-semibold text-white pt-2">
            Food are freshly from high-quality raw vegetable and grocery products. Please place your order as soon as possible.
          </p>
        </div>
      </div>
<div className="mt-8 px-4 sm:px-20 flex flex-col sm:flex-row sm:justify-start items-center gap-6">
  {/* Dalbati Card */}
  <div className="flex flex-col group w-full sm:w-fit p-4 rounded-lg transition-all max-w-[400px]">
    <Link href="/menu/dal-bati">
      <div className="w-full sm:w-[300px] h-[200px] sm:h-[300px] border-2 border-transparent rounded-lg overflow-hidden flex items-center justify-center">
        <div className="transition-transform duration-300 hover:scale-110">
          <img
            src="https://media.istockphoto.com/id/1458973879/photo/rajasthani-traditional-cuisine-dal-baati.jpg?s=612x612&w=0&k=20&c=bBspCwj57CtdD0m66dZpNpNU_Dou3o7l1PscMUsijQc="
            alt="Dal Bati"
            className="w-full h-full object-cover rounded-md"
          />
        </div>
      </div>
    </Link>
    <h3 className="mt-2 text-xl sm:text-2xl">Dalbati</h3>
    <h3 className="text-md sm:text-xl font-medium text-gray-600">£6</h3>
  </div>

  {/* Pav Bhaji Card */}
  <div className="flex flex-col group w-full sm:w-fit p-4 rounded-lg transition-all max-w-[400px]">
    <Link href="/menu/pav-bhaji">
      <div className="w-full sm:w-[300px] h-[200px] sm:h-[300px] border-2 border-transparent rounded-lg overflow-hidden flex items-center justify-center">
        <div className="transition-transform duration-300 hover:scale-110">
          <img
            src="https://media.istockphoto.com/id/1327433011/photo/pav-bhaji-indian-street-food-bharuch-gujarat-india.jpg?s=612x612&w=0&k=20&c=R_Nl3Ig6qTNMidQkjXH0It8MINDJY-C5GMiIv-HxO04="
            alt="Pav Bhaji"
            className="w-full h-full object-cover rounded-md"
          />
        </div>
      </div>
    </Link>
    <h3 className="mt-2 text-xl sm:text-2xl">Pavbhaji</h3>
    <h3 className="text-md sm:text-xl font-medium text-gray-600">£5</h3>
  </div>
</div>


      <Link href="/menu">
        <p className="text-xl sm:text-2xl md:text-3xl px-6 py-10 flex items-center gap-2">
          Explore Products
          <svg xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
            className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </p>
      </Link>
    </>
  );
}
