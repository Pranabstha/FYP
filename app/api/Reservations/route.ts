import { NextResponse } from "next/server";
import getCurrentUser from "@/app/action/getUser";


export async function POST(
    request: Request
){
    const currentUser = await getCurrentUser()
    if(!currentUser){
        return NextResponse.error()
    }

    const body= await request.json()
    const{
        listingId,
        startDate,
        endDate,
        totalPrice,
        guestCount,
        roomCount
    } = body;

    console.log(body,'0--0-0-0-00-0-0-0-0-0-0-0-0-')

    if(!listingId || !startDate || !endDate || !totalPrice || !guestCount || !roomCount ){
        console.log('calling')
        return NextResponse.json({'message':"Data Incomplete"},{
            status:400
        })
    }
    // console.log("))))))))")
    try {     
        const listingReservation = await prisma?.listing.update({
            where:{
                id: listingId
            }, data:{
                reservation:{
                    create:{
                        userId: currentUser.id,
                        startDate,
                        endDate,
                        totalPrice,
                        guestCount,
                        roomCount
    
                    }
                }
            }
        })
        return NextResponse.json(listingReservation)
    } catch (error) {
     console.log(error)
      return NextResponse.error()
        
    }

    // console.log(listingReservation)


}
