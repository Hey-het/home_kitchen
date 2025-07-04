import NavBar from "@/Components/Navbar";
import Image from "next/image";
import Link from "next/link";
import { } from "@heroicons/react/24/outline";

export default function homePage() {
  return (
    <>
      {/* <NavBar/> */}
      <div className="relative w-full h-[600px] ">
        <img
          src="https://cdn.sumup.store/shops/81731664/settings/th240/11f10fe2-e928-4c55-9da0-c1a9ebed8a68.jpeg"
          className="w-full h-full blur-xs " // Adjust width and height here
          alt="Hetal's Home Kitchen Logo"

        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-7xl font-semibold text-center  text-white pb-20 rounded-lg">
            Hetal&apos;s Home Kitchen!
          </h1>
        </div>
        <br />
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-xl font-semibold text-center  text-white pt-14 rounded-lg">
            Food are freshly from high-quality raw vegetable and grocery products. Please place your order as soon as possible.
          </p>
        </div>

      </div>

      <div className="join mt-8 ml-20 flex justify-start items-center">
        <div className="flex flex-col group border-transparent w-fit  p-4 rounded-lg transition-all max-w-[400px]">
          <Link href="/menu/dal-bati">
            <div className="w-[300px] h-[300px] border-2 border-transparent rounded-lg overflow-hidden flex items-center justify-center">
              <div className="transition-transform duration-300 hover:scale-110">
                <img
                  src="https://media.istockphoto.com/id/1458973879/photo/rajasthani-traditional-cuisine-dal-baati.jpg?s=612x612&w=0&k=20&c=bBspCwj57CtdD0m66dZpNpNU_Dou3o7l1PscMUsijQc="
                  alt="Dal Bati"
                  className="w-[300px] h-[300px] object-cover rounded-md"
                />
              </div>
            </div>
          </Link>
          <h3 className="mt-2 text-2xl">Dalbati</h3>
          <h3 className="text-xl font-medium text-gray-600">£6</h3>
        </div>

        <div className="flex flex-col group  border-transparent w-fit p-4 rounded-lg transition-all  max-w-[400px]">
          {/* <Link href="/menu"> */}
          <Link href="/menu/pav-bhaji">
            <div className="w-[300px] h-[300px] border-2 border-transparent rounded-lg overflow-hidden flex items-center justify-center">
              <div className="transition-transform duration-300 hover:scale-110">
                <img
                  src="https://media.istockphoto.com/id/1327433011/photo/pav-bhaji-indian-street-food-bharuch-gujarat-india.jpg?s=612x612&w=0&k=20&c=R_Nl3Ig6qTNMidQkjXH0It8MINDJY-C5GMiIv-HxO04="
                  alt="Pav Bhaji"
                  className="w-[300px] h-[300px] object-cover rounded-md"
                />
              </div>
            </div>
          </Link>




          {/* </Link> */}
          <h3 className="mt-2 text-2xl">Pavbhaji</h3>
          <h3 className="text-xl font-medium text-gray-600">£5</h3>
        </div>
      </div>
      <Link href="/menu">
        <p className="text-3xl p-20 flex items-center gap-2">
          Explore Products
          <svg xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"
            className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </p>
      </Link>
      {/* </Link> */}
    </>
  );
}
