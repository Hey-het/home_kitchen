import Checkout from "@/Components/Checkout";
import { db } from "@/utils/dbConnection";
import { auth } from "@clerk/nextjs/server";


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
        WHERE cart.user_id=$1`,[userId])).rows;
    
    // console.log(cartItems[0]);
    
    async function handleSumbitData(formValues) {
        "use server";
        const formData = {
            full_name: formValues.get("full_name"),
            email: formValues.get("email"),
            phone_number: formValues.get("phone_number"),
        };

        await db.query(
            `INSERT INTO customer(full_name, email, phone_number)
             VALUES($1, $2, $3)`,
            [formData.full_name, formData.email, formData.phone_number]
        );
    }

   

    return (
        <>
            <Checkout handelSumbit={handleSumbitData} orderSumbit={cartItems}
            />
            
           
        </>
    );
}


