import CartPage from "@/Components/Cart";
import { db } from "@/utils/dbConnection";
import { cookies } from "next/headers";

export default async function cartPage(profile) {
   const cookieStore = await cookies(); // ✅
  const sessionId = cookieStore.get("session_id")?.value;

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

  async function deleteCartItem(id) {
    "use server";
    await db.query(`DELETE FROM cart WHERE id = $1`, [id]);
  }

  async function placeOrderOnServer(items) {
    "use server";
    // Assuming you want to store session_id here instead of user_id
    await db.query(`
      INSERT INTO customer(full_name, email, phone_number, session_id)
      VALUES ($1, $2, $3, $4)
    `, [items.fullName, items.email, items.phone, sessionId]);

    await db.query(`DELETE FROM cart WHERE session_id = $1`, [sessionId]);
  }

  async function quantityUpdate(items) {
    "use server";
    await db.query(
      `UPDATE cart SET quantity = $1, total_price = $2 WHERE id = $3 AND session_id = $4`,
      [items.quantity, items.total_price, items.id, sessionId]
    );
  }

  return (
    <>
      <CartPage
        orderSumbit={cartItems}
        quantityUpdate={quantityUpdate}
        placeOrder={placeOrderOnServer}
        deleteItem={deleteCartItem}
      />
    </>
  );
}
