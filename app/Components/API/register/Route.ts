import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

import prisma from "@/app/Library/prismdb";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, name, passoword, confirmPassword } = body;

  const hashedPassword = await bcrypt.hash(passoword, 12);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      hashedPassword,
    },
  });

  return NextResponse.json(user);
}


