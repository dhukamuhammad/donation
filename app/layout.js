import { Outfit } from "next/font/google";
import "./globals.scss";
import Toaster from "@/components/Toaster";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "Donation App",
  description: "Donation & Fundraising Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} antialiased`}>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
