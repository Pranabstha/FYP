import { NextResponse } from "next/server";

import prisma  from "@/app/Library/prismdb";
import getCurrentUser from "@/app/action/getUser";

export async function POST(
    request: Request
){
    const currentUser = await getCurrentUser();

    if(!currentUser){
        return NextResponse.error();
    }

    const body = await request.json();
    const {
        title,
        description,
        imageSrc,
        category,
        roomCount,
        bathCount,
        guestCount,
        price

    }=body;    
    const lisiting = await prisma.listing.create({
        data: {
            title,
            description,
            imageSrc,
            category,
            roomCount,
            bathCount,
            guestCount,
            price: parseInt(price,10),
            userId: currentUser.id
        }
    })

    return NextResponse.json(lisiting)  
}
