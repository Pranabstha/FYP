import prisma from '@/app/Library/prismdb'

interface IParams{
    id?: string
    userId?: string
    authorId?: string
}

export default async function getReservation(params:IParams) {
    try{
        const{id, userId, authorId} = params

    const query: any = {}
    
    if(id){
        query.id = id
    }
    if(userId){
        query.userId = userId
    }
    if(authorId){
        query.listing = {userId: authorId}
    }

    const reservation = await prisma.reservation.findMany({
        where: query,
        include: {
            listing: true
        }, orderBy: {
            createdAt: "desc"
        }
    })
    

    const safeReservation = reservation.map(
        (reservation) =>({
        ...reservation, 
        createdAt: reservation.createdAt.toISOString(),
        startDate: reservation.startDate.toISOString(),
        endDate: reservation.endDate.toISOString(),
        listing:{
            ...reservation.listing, 
            createdAt: reservation.listing.createdAt.toISOString()
        }
    })
    )


    return safeReservation
    }
    catch(error:any){
        return error
    }
    
}