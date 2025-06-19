import CartPage from "@/Components/Cart";
import { db } from "@/utils/dbConnection";
import { auth } from "@clerk/nextjs/server";


export default async function cartPage(){
    const { userId } = await auth();
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
            WHERE cart.user_id=$1`,[userId])).rows;
        
    return(
        <>
        <CartPage orderSumbit={cartItems}/>
        
        </>
    );
}