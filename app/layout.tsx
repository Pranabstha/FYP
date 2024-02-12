// Importing type Metadata from Next.js
import type { Metadata } from "next";
// Importing global styles
import "./globals.css";
// Importing Nunito font from Next.js
import { Nunito } from "next/font/google";
// Importing components and providers
import Navbar from "./Components/navbar/Navbar";
import RegisterModel from "./Components/Models/UserRegistrationModel";
import LoginModel from "./Components/Models/UserLoginModel";
import TosterProvider from "./Providers/TosterProvider";
import getCurrentUser from "./action/getUser";
import RentModel from "./Components/Models/RentModel";
import Client from "./Components/Client";

// Configuring Nunito font with Latin subset
const font = Nunito({ subsets: ["latin"] });

// Metadata for the application
export const metadata: Metadata = {
  title: "Nameastay",
  description: "Final year project",
};

// RootLayout component to wrap the entire application
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetching the current user information
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      {/* Body of the HTML document */}
      <body className={font.className}>
        <Client>
          {/* Toast provider for displaying notifications */}
          <TosterProvider />
          {/* Login model component */}
          <LoginModel />
          {/* Registration model component */}
          <RegisterModel />
          {/* RentModel model component */}
          <RentModel />
          {/* Navbar component with the current user information */}
          <Navbar currentUser={currentUser} />
          {/* Main content of the application */}
          <div className="pb-20 pt-28">{children}</div>
        </Client>
      </body>
    </html>
  );
}
