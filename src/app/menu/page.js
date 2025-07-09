import { db } from "@/utils/dbConnection";
import Image from "next/image";
import Link from "next/link";

export default async function menuPage() {
  const foodItems = (await db.query(`SELECT * FROM food_items`)).rows;

  return (
    <>
      
     <div className="flex flex-col px-4 sm:px-10">
  <div className="mt-10 mb-6">
    <h1 className="text-3xl sm:text-5xl font-bold">Explore Products</h1>
  </div>

  <div className="flex flex-wrap justify-center sm:justify-start gap-6 sm:gap-8">
    {foodItems.map((items) => (
      <div
        key={items.food_id}
        className="flex flex-col group w-full sm:w-fit p-4 rounded-lg transition-all max-w-[400px] items-center"
      >
        <Link href={`/menu/${items.route_name}`}>
          <div className="w-full sm:w-[300px] h-[200px] sm:h-[300px] border-2 border-transparent rounded-lg overflow-hidden flex items-center justify-center">
            <div className="transition-transform duration-300 group-hover:scale-110 w-full h-full">
              <img
                src={items.img_src}
                alt={items.prod_name}
                className="w-full h-full object-cover rounded-md"
              />
            </div>
          </div>
        </Link>
        <h2 className="mt-2 text-xl sm:text-2xl font-semibold text-center">{items.prod_name}</h2>
        <p className="text-md sm:text-xl font-medium text-gray-600 text-center">£{items.unit_price}</p>
      </div>
    ))}
  </div>
</div>

    </>
  );
}
