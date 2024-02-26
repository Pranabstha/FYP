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
        guestCount,
        price,
        latitude,
        longitude, 
        address

    }=body;   

    const lisiting = await prisma.listing.create({
        data: {
            title,
            description,
            imageSrc,
            category,
            roomCount,
            guestCount,
            price: parseInt(price,10),
            userId: currentUser.id,
            latitude: latitude,
            longitude: longitude,
            address: address
        }
    })

    return NextResponse.json(lisiting)  
}
