import Checkout from "@/Components/Checkout";
import { db } from "@/utils/dbConnection";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function createPage({ params }) {
  
   const cookieStore = await cookies(); // ✅
  const sessionId = cookieStore.get("session_id")?.value;

  const food_items = (
    await db.query(`SELECT * FROM food_items WHERE route_name = $1`, [params.menudetails])
  ).rows;

  const cartItems = (await db.query(`
    SELECT 
      cart.id,
      cart.quantity,
      cart.total_price,
      cart.session_id,
      food_items.img_src,
      food_items.unit_price,
      food_items.prod_name
    FROM cart
    JOIN food_items ON cart.food_id = food_items.food_id 
    WHERE cart.session_id = $1
  `, [sessionId])).rows;

  async function handleSumbitData(items) {
    "use server";
    await db.query(`
      INSERT INTO customer(full_name, email, phone_number, session_id)
      VALUES ($1, $2, $3, $4)
    `, [items.fullName, items.email, items.phone, sessionId]);

    await db.query(`DELETE FROM cart WHERE session_id = $1`, [sessionId]);
    revalidatePath("/checkout");
    redirect("/checkout");
  }

  return (
    <>
      <Checkout 
        placeOrder={handleSumbitData}
        orderSumbit={cartItems}
      />
    </>
  );
}
