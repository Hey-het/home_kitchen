import Checkout from "@/Components/Checkout";
import { db } from "@/utils/dbConnection";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


export default async function createPage({ params}) {
    const { userId } = await auth();
    // console.log(userId);
    const food_items = (
        await db.query(`SELECT * FROM food_items WHERE route_name=$1`, [params.menudetails])
    ).rows;

    
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
   
     async function handleSumbitData(items) {
        "use server";
        await db.query(`
                INSERT INTO customer(full_name, email, phone_number, user_id)
                VALUES($1, $2, $3, $4)`, [items.fullName, items.email, items.phone, userId]);

        await db.query(`DELETE FROM food_cart WHERE user_id = $1`, [userId]);

    };

    return (
        <>
            <Checkout 
            placeOrder={handleSumbitData}
            orderSumbit={cartItems}

            />
            
           
        </>
    );
}


