import CheckoutForm from "@/Components/CheckoutForm"
import { auth } from "@clerk/nextjs/server";


export default async function checkoutForm(){

    const { userId } = await auth();
console.log(userId)
 async function placeOrderOnServer(items) {
    
    
        "use server";
        await db.query(`
                INSERT INTO customer(full_name, email, phone_number, user_id)
                VALUES($1, $2, $3, $4)`, [items.fullName, items.email, items.phone, userId]);

        await db.query(`DELETE FROM cart WHERE user_id = $1`, [userId]);

        // console.log(items.fullName, items.email, items.phone);

    };




    return(
        <>
        <CheckoutForm placeOrder={placeOrderOnServer}
        
        />
        </>
    )
}