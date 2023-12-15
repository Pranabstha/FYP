"use CLient";

import React from "react";
import Container from "../Container";
import { User } from "@prisma/client";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";

interface NavbarProps {
  currentUser?: User | null
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  // Find session of the user
  console.log({currentUser})
  return (
    <div className="fixed w-full bg-white z-10 shadow sm">
      <div
        className="py-4 
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
            <Logo />
            <Search />
            <UserMenu currentUser = {currentUser}/>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
