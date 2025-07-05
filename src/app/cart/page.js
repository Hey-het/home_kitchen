import CartPage from "@/Components/Cart";
import Checkout from "@/Components/Checkout";
import { db } from "@/utils/dbConnection";
import { auth } from "@clerk/nextjs/server";
import NavBar from "@/Components/Navbar";


export default async function cartPage(profile) {
    const { userId } = await auth();
    let foodId;
    const cartItems = (await db.query(`
            SELECT 
                cart.id,
                cart.quantity,
                cart.total_price,
                cart.user_id,
                food_items.img_src,
                food_items.unit_price,
                food_items.prod_name
            FROM cart
            JOIN food_items
            ON cart.food_id = food_items.food_id 
            WHERE cart.user_id=$1`, [userId])).rows;


    async function deleteCartItem(id) {
        "use server";
        await db.query(
            `DELETE FROM cart WHERE id= $1`,
            [id]
        );
    }

    async function placeOrderOnServer(items) {
        "use server";
        await db.query(`
                INSERT INTO customer(full_name, email, phone_number, user_id)
                VALUES($1, $2, $3, $4)`, [items.fullName, items.email, items.phone, userId]);

        await db.query(`DELETE FROM cart WHERE user_id = $1`, [userId]);

        // console.log(items.fullName, items.email, items.phone);

    };

    async function quantityUpdate(items) {
        "use server";
        await db.query(
            `UPDATE cart SET quantity = $1, total_price = $2 WHERE id = $3 AND user_id = $4`,
            [items.quantity, items.total_price, items.id, userId]
        );
        // console.log("Quantity updated successfully");
        // revalidatePath('/cart');
    }

    return (
        <>  
            {/* <NavBar orderSumbit={cartItems} /> */}
            
            <CartPage 
                orderSumbit={cartItems}
                quantityUpdate={quantityUpdate}
                placeOrder={placeOrderOnServer}
                deleteItem={deleteCartItem}
                 
        
            />
            


        </>
    );
}