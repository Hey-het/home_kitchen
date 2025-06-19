import Checkout from "@/Components/Checkout";
import Serch from "@/Components/Serch";
import { db } from "@/utils/dbConnection"
import Image from "next/image";
import Link from "next/link";


export default async function menuPage() {
    const foodItems = (await db.query(`SELECT * FROM food_items`)).rows
    
    return (
        <>
            <Serch />
            <div className="flex flex-col">
                <div className="m-10">
                    <h1 className="text-5xl font-bold mb-4" >Explore Products</h1>
                </div>
                <div className="flex flex-wrap justify-center gap-8">
                    {foodItems.map((items) => (
                        <div key={items.food_id}
                            className="flex flex-col items-center">
                            <Link href={`/menu/${items.route_name}`}>

                                <Image
                                    className="ml-4 hover:scale-105  duration-300 border border-gray-300 rounded-lg shadow-lg"
                                    src={items.img_src}
                                    alt={items.prod_name}
                                    width={300}
                                    height={300}
                                />
                            </Link>
                            <h2 className="card-title">{items.prod_name}</h2>
                            <p>{items.unit_price}</p>
                        </div>
                    ))
                    }
                </div>
            </div>

        </>
    )
};