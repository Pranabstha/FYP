

import type { Metadata } from "next";
import "./globals.css";
import { Nunito } from "next/font/google";
import Navbar from "./Components/navbar/Navbar";
import RegisterModel from "./Components/Models/userRegistrationModel";
import LoginModel from "./Components/Models/userLoginModel";
import TosterProvider from './Providers/TosterProvider'
import getCurrentUser from './action/getUser'


const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NameAstay",
  description: "Final year project",
};
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <html>
      <body className={font.className}>
        <TosterProvider />
        <RegisterModel />
        <LoginModel />
        <Navbar currentUser = {currentUser}/> 
        {children}
        </body>
    </html>
  );
}
