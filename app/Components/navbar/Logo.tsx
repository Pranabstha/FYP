"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();

  return (
    <Image
      className="hidden md:block cursor-pointer"
      src="/images/logo.png"
      height="150"
      width="150"
      alt="Logo"
      onClick={() => router.push("/")}
    />
  );
};

export default Logo;
