import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { db } from "@/utils/dbConnection";
import NavBar from "@/Components/Navbar";
import FooterPage from "@/Components/Footer";
import Footer2 from "@/Components/Footer2";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";
import { auth } from "@clerk/nextjs/server";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: " Hetal's Home Kitchen",
 icons: {
    icon: '/favicon.ico',
  },
};

export default async function RootLayout({ children }) {
   const { userId } = await auth();

  let cartItems = [];
  if (userId) {
    cartItems = (
      await db.query(
        `
        SELECT 
          cart.id,
          cart.quantity,
          cart.total_price,
          cart.user_id,
          food_items.img_src,
          food_items.unit_price,
          food_items.prod_name
        FROM cart
        JOIN food_items ON cart.food_id = food_items.food_id 
        WHERE cart.user_id = $1`,
        [userId]
      )
    ).rows;
  }
  return (
     <ClerkProvider>
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
          <NavBar orderSumbit={cartItems} />
        {children}
          <Toaster position="top-center" />
          
          <FooterPage/>
        <Footer2 />
      </body>
    </html>
     </ClerkProvider>
  );
}
