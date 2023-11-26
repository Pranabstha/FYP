

import type { Metadata } from "next";
import "./globals.css";
import { Nunito } from "next/font/google";
import Navbar from "./Components/navbar/Navbar";
import RegisterModel from "./Components/Models/userRegistrationModel";

const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NameAstay",
  description: "Final year project",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <RegisterModel/>
        <Navbar/> 
        {children}
        </body>
    </html>
  );
}
