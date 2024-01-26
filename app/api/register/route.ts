import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

import prisma from "@/app/Library/prismdb";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, password } = body;
    const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword,
    },
  });
  return NextResponse.json({data: user, message: "User sucessfully created"});
  } catch (error) {
    return NextResponse.json({
      error,message: "Something went wrong, try again later"
    })
  }

}
