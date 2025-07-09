import SortDropdown from "@/Components/SortDropdown";
import { db } from "@/utils/dbConnection";
import Link from "next/link";

export default async function menuPage({searchParams}) {
  const foodItems = (await db.query(`SELECT * FROM food_items`)).rows;
  
  const Params = await searchParams;
    const sort = Params.sort;

  let query = "SELECT * FROM food_items";

  switch (sort) {
    case "a-z":
      query += " ORDER BY prod_name ASC";
      break;
    case "z-a":
      query += " ORDER BY prod_name DESC";
      break;
    case "low-price":
      query += " ORDER BY unit_price ASC";
      break;
    case "high-price":
      query += " ORDER BY unit_price DESC";
      break;
    default:
      break;
  }
   const sortedFoodItems = (await db.query(query)).rows;

  return (
    <>
      
          <div className="flex flex-col px-4 sm:px-10 ml-14">
              <nav className="text-sm font-medium text-gray-700 mb-6 py-6  flex flex-wrap gap-x-2 gap-y-1">
                <Link href="/" className="hover:underline font-bold text-black">Home</Link>
                <span>/</span>
                <span className="hover:underline text-neutral-800">Products</span> 
              </nav>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-10 mb-6">
                    <h1 className="text-3xl sm:text-5xl font-bold">Explore Products</h1>

                    <div className="flex gap-4">
                      {/* Category Dropdown */}
                      <div>
                        <label className="block text-sm font-medium">Categories</label>
                        <select className="border border-gray-300 font-bold px-4 py-2 w-3xs ">
                          <option>All</option>
                          <option>Snacks</option>
                          <option>Drinks</option>
                        </select>
                      </div>

                      {/* Sort Dropdown */}
                      <div>
                        <label className="block text-sm font-medium">Sort By</label>
                      <SortDropdown/>
                      </div>
                    </div>
              </div>


              <div className="flex flex-wrap justify-center sm:justify-start sm:gap-6">
                {sortedFoodItems.map((items) => (
                  <div
                    key={items.food_id}
                    className="flex flex-col group w-full sm:w-fit  rounded-lg transition-all max-w-[400px] items-center"
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
