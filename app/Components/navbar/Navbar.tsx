// Importing necessary React components and libraries
import React from "react";
import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import Categories from "./Categories";
import { safeUser } from "@/app/Types";

// Defining the props for the Navbar component
interface NavbarProps {
  currentUser?: safeUser | null;
}

// Defining the Navbar component
const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  // // Find session of the user
  console.log({ currentUser });
  // console.log({})
  // JSX for the Navbar component
  return (
    <div className="fixed w-full bg-white z-10 shadow sm">
      <div
        className="
          py-4 
          boarder-b-[1px]"
      >
        <Container>
          <div
            className="
              flex 
              flex-row 
              items-center
              justify-between 
              gap-3
            "
          >
            {/* Logo component */}
            <Logo />
            {/* Search component */}
            <Search />
            {/* UserMenu component with current user information */}
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
      {/* Categories component */}
      <Categories />
    </div>
  );
};

// Exporting the Navbar component
export default Navbar;
