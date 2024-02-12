import getCurrentUser from "@/app/action/getUser";
import  prisma  from "@/app/Library/prismdb";
import { NextResponse } from "next/server";


interface FavProps{
    listingId?: string
}


export async function POST(
    request: Request,
    { params }: { params: FavProps }    ) {
        const currentUser = await getCurrentUser();

        if (!currentUser){
            return NextResponse.error()
        }
        const {listingId} = params

        if(!listingId || typeof listingId !== 'string'){
            throw new Error('Invalid Id')
        }

        let favId =[...(currentUser.favs || [])]

        favId.push(listingId)

        const user = await prisma.user.update({
            where: {
                id : currentUser.id
            },
            data:{
                favs: favId
            }
        })

        return NextResponse.json(user)
}


export async function DELETE(
    request: Request,
    { params }: { params: FavProps } ){
        

        const currentUser = await getCurrentUser();

        if (!currentUser){
            return NextResponse.error()
        }
        const {listingId} = params

        if(!listingId || typeof listingId !== 'string'){
            throw new Error('Invalid Id')
        }

        let favId =[...(currentUser.favs || [])]
        
        favId = favId.filter((id) => id !== listingId)

        const user = await prisma.user.update({
            where: {
                id : currentUser.id
            },
            data:{
                favs: favId
            }
        })

        return NextResponse.json(user)
    }