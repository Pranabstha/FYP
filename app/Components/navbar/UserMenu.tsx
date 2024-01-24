"use client";

// Importing necessary React components and libraries
import React, { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "./Avatar";
import userRegisterHook from "@/app/hooks/UserRegisterHook";
import MenuItem from "./MenuItems";
import userLoginHook from "@/app/hooks/UserLoginHook";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import userRentHook from "@/app/hooks/UserRentHook";

// Defining the props for the UserMenu component
interface UserMenuProps {
  currentUser?: User | null;
}

// Defining the UserMenu component
const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  // Fetching custom hooks for user registration and login
  const register = userRegisterHook();
  const loginModel = userLoginHook();

  const rentModel = userRentHook();

  // State to manage the visibility of the menu
  const [isOpen, setIsOpen] = useState(false);

  // Toggle function to switch the menu visibility
  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  //rent model
  const onRent = useCallback(() => {
    if (!currentUser) {
      return rentModel.onOpen();
    }

    rentModel.onOpen();
  }, [currentUser, rentModel, rentModel]);

  // JSX for the UserMenu component
  return (
    <div className="relative">
      {/* Main navigation elements */}
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRent}
          className="
            md: block
            text: sm 
            font-semibold
            py-3
            px-4
            rounded-full
            hover: bg-neutral-100
            transition
            cursor-pointer
          "
        >
          List Property
        </div>
        <div
          onClick={toggleOpen}
          className="
            p-4
            md:py-1
            md:px-2
            border-[1px]
            border-neutral-200
            flex
            flex-row
            items-center
            gap-3
            rounded-full
            cursor-pointer
            hover:shadow-md
            transition
          "
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar />
          </div>
        </div>
      </div>

      {/* Menu items */}
      {isOpen && (
        <div
          className="
            absolute
            rounded-xl
            shadow-md
            w-[-40vw]
            md:w-3/4
            bg-white
            overflow-hidden
            right-0
            top-12
            text-sm
          "
        >
          {/* authentication */}
          <div className="flex flex-col cursor-pointer">
            {currentUser?.role === "USER" ? (
              // Display menu items for authenticated user
              <>
                <MenuItem onClick={() => {}} label="Reservation" />
                <MenuItem onClick={() => {}} label="Favorites" />
                <MenuItem onClick={() => {}} label="Edit profile" />
                <hr />
                <MenuItem onClick={() => signOut()} label="Log Out" />
              </>
            ) : // Admin role authentication
            currentUser?.role === "ADMIN" ? (
              // Display menu items for admin
              <>
                <MenuItem onClick={() => {}} label="Admin Dashboard" />
                <MenuItem onClick={() => {}} label="Manage Users" />
                <MenuItem onClick={() => {}} label="Manage Listing" />
                <MenuItem onClick={() => {}} label="Manage Reservations" />
                {/* Add other admin-specific menu items as needed */}
                <hr />
                <MenuItem onClick={() => signOut()} label="Log Out" />
              </>
            ) : (
              // Display menu items for non-authenticated user
              <>
                <MenuItem onClick={loginModel.onOpen} label="Log In" />
                <MenuItem onClick={register.onOpen} label="Sign Up" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Exporting the UserMenu component
export default UserMenu;
