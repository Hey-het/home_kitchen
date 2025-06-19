import { db } from "@/utils/dbConnection";
import Image from "next/image";
import { ImFacebook2 } from "react-icons/im";
import { BsInstagram } from "react-icons/bs";
import { RiWhatsappFill } from "react-icons/ri";
import { CiShoppingCart } from "react-icons/ci";
import Link from "next/link";
import Quantity from "@/Components/Quantity";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";


export default async function menuDetailsPage({ params }) {
    
    const food_items = (await db.query(`SELECT * FROM food_items WHERE route_name=$1`, [params.menudetails])).rows;
    
    async function insertData(quantity, total_price, food_id,) {
        "use server"
        const { userId } = await auth(); 
        console.log("UserId:", userId);
        await db.query(
            `INSERT INTO cart (quantity,total_price,food_id,user_id) 
             VALUES ($1, $2, $3,$4)`,
            [quantity, total_price, food_id,userId]
        );
        revalidatePath('/checkout');
        redirect('/checkout');
        
    }
    
    
  
    return (
        <>
            <div className="p-8 space-y-8">
                <div className="flex flex-row ">
                    <div className="w-[50%]">
                        <Image
                            className="rounded-lg hover:scale-105 duration-300"
                            src={food_items[0].img_src}
                            alt={food_items[0].prod_name}
                            width={1000}
                            height={1000}
                        />
                    </div>
                    <div className="ml-6 w-[50%]">
                        <h1 className="text-5xl font-bold">{food_items[0].prod_name}</h1>
                        <h2 className="text-4xl font-bold">£{food_items[0].unit_price}</h2>
                        <div className="flex flex-col">

                        <Quantity 
                        product={food_items[0]}
                        handleBuyNow={insertData}
                        />
                            <br />
                            <button type="sumbit" className="btn bg-white border-black "><CiShoppingCart /> Add to Cart</button>
                        </div>

                        <div className="flex flex-row space-x-2 mt-4">
                            <a href="https://www.facebook.com/XdW2Q4yhuQxkkc5x " className="text-2xl">
                                <ImFacebook2 />
                            </a>
                            <a href="https://www.instagram.com/hetalshomekitchen/" className="text-2xl">
                                <BsInstagram />
                            </a>
                            <a href="https://api.whatsapp.com/send/?phone=%2B447928042962&text&type=phone_number&app_absent=0" className="text-2xl">
                                <RiWhatsappFill />
                            </a>
                        </div>
                        <br />
                        <br />
                        <h2 className="text-gray-700 text-sm leading-relaxed text-wrap">
                            {food_items[0].description}
                        </h2>
                    </div>
                </div>
            </div>
        </>
    );
}
