import { db } from "@/utils/dbConnection";
import Image from "next/image";
import { ImFacebook2 } from "react-icons/im";
import { BsInstagram } from "react-icons/bs";
import { RiWhatsappFill } from "react-icons/ri";
import Link from "next/link";
import Quantity from "@/Components/Quantity";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { cookies } from "next/headers";


export default async function MenuDetailsPage({ params }) {
  const { menudetails } = await params;
  const food_items = (await db.query(`SELECT * FROM food_items WHERE route_name=$1`, [menudetails])).rows;


     const cookieStore = await cookies(); // ✅
  const sessionId = cookieStore.get("session_id")?.value;

  async function insertData(quantity, total_price, food_id) {
    "use server";
    // const { userId } = await auth();

    if (!sessionId) throw new Error("Session ID missing");

    await db.query(
      `INSERT INTO cart (quantity, total_price, food_id, session_id) VALUES ($1, $2, $3, $4)`,
      [quantity, total_price, food_id, sessionId]
    );
    revalidatePath('/checkout');
    redirect('/checkout');
  }

  async function insertCart(quantity, total_price, food_id) {
    "use server";
    // const { userId } = await auth();
   

    if (!sessionId) throw new Error("Session ID missing");

    await db.query(
      `INSERT INTO cart (quantity,total_price,food_id,session_id) VALUES ($1, $2, $3,$4)`,
      [quantity, total_price, food_id, sessionId]
    );
    // console.log("Data inserted successfully");
    revalidatePath('/cart');
    redirect('/cart');
  }

  return (
    <>
      <div className="pt-8 px-6 sm:px-20">
        <nav className="text-sm font-medium text-gray-700 mb-6 flex flex-wrap gap-x-2 gap-y-1">
          <Link href="/" className="hover:underline text-blue-600">Home</Link>
          <span>/</span>
          <Link href="/menu" className="hover:underline text-blue-600">Products</Link>
          <span>/</span>
          <Link href="/menu" className="hover:underline text-blue-600">My Shelf</Link>
          <span>/</span>
          <span className="text-gray-500">{food_items[0].prod_name}</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/2 w-full">
            <Image
              className="rounded-lg hover:scale-105 duration-300 shadow-lg"
              src={food_items[0].img_src}
              alt={food_items[0].prod_name}
              width={500}
              height={500}
              style={{ width: "100%", height: "auto" }}
            />
          </div>

          <div className="lg:w-1/2 w-full flex flex-col">
            <h1 className="text-4xl sm:text-5xl font-bold mb-3">{food_items[0].prod_name}</h1>
            <h2 className="text-3xl sm:text-4xl font-semibold mb-6">£{food_items[0].unit_price}</h2>

            <Quantity
              product={food_items[0]}
              handleBuyNow={insertData}
              addToCart={insertCart}
            />

            <div className="mt-8">
              <h2 className="text-sm font-extralight mb-2">Share</h2>
              <div className="flex gap-4 text-xl text-gray-600">
                <a href="https://www.facebook.com/XdW2Q4yhuQxkkc5x" aria-label="Facebook" className="hover:text-blue-600 transition">
                  <ImFacebook2 />
                </a>
                <a href="https://www.instagram.com/hetalshomekitchen/" aria-label="Instagram" className="hover:text-pink-500 transition">
                  <BsInstagram />
                </a>
                <a href="https://api.whatsapp.com/send/?phone=%2B447928042962&text&type=phone_number&app_absent=0" aria-label="WhatsApp" className="hover:text-green-500 transition">
                  <RiWhatsappFill />
                </a>
              </div>
            </div>

            <p className="mt-8 text-gray-700 text-base leading-relaxed whitespace-pre-wrap">
              {food_items[0].description}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
