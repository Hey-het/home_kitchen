import Checkout from "@/Components/Checkout";
import Serch from "@/Components/Serch";
import { db } from "@/utils/dbConnection";
import Image from "next/image";
import Link from "next/link";

export default async function menuPage() {
  const foodItems = (await db.query(`SELECT * FROM food_items`)).rows;

  return (
    <>
      {/* <Serch /> */}
      <div className="flex flex-col px-4 sm:px-10">
        <div className="mt-10 mb-6">
          <h1 className="text-3xl sm:text-5xl font-bold">Explore Products</h1>
        </div>

        <div className="flex flex-wrap justify-center sm:justify-start gap-6 sm:gap-8">
          {foodItems.map((items) => (
            <div
              key={items.food_id}
              className="flex flex-col items-center w-full sm:w-[300px] max-w-[100%] sm:max-w-[300px]"
            >
              <Link href={`/menu/${items.route_name}`} className="w-full">
                <Image
                  className="w-full h-auto hover:scale-105 duration-300 border border-gray-300 rounded-lg shadow-md object-cover"
                  src={items.img_src}
                  alt={items.prod_name}
                  width={300}
                  height={300}
                />
              </Link>
              <h2 className="mt-2 text-lg sm:text-xl font-semibold text-center">
                {items.prod_name}
              </h2>
              <p className="text-gray-600 text-center">{items.unit_price}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
