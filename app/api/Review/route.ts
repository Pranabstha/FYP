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
        rating,
        review,
        listingId,
    } = body;


    if(!listingId || !review ){
        return NextResponse.json({'message':"Data Incomplete"},{
            status:400
        })
    }
    try {     
        const newreview = await prisma?.listing.update({
            where:{
                id: listingId
            }, data:{
                Review:{
                    create:{
                        userId: currentUser.id,
                        rating,
                        review,
                    }
                }
            }
        })
        return NextResponse.json(newreview)
    } catch (error) {
     console.log(error)
      return NextResponse.error()
        
    }



}
