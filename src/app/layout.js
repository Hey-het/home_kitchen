import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { db } from "@/utils/dbConnection";
import NavBar from "@/Components/Navbar";
import FooterPage from "@/Components/Footer";
import Footer2 from "@/Components/Footer2";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";
import { cookies } from "next/headers"; // get cookies in server components

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
  // Get the guest session_id cookie from cookies
  const cookieStore = await cookies();
  const sessionId =  cookieStore.get("session_id")?.value;

  let cartItems = [];

  if (sessionId) {
    cartItems = (
      await db.query(
        `
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
      `,
        [sessionId]
      )
    ).rows;
  }

  return (
    
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <NavBar orderSumbit={cartItems} />
          {children}
          <Toaster position="top-center" />
          <FooterPage />
          <Footer2 />
        </body>
      </html>
    
  );
}
