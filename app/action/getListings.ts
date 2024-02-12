import prisma from "@/app/Library/prismdb"

export default async function getListing() {
   try{
        const showListings = await prisma.listing.findMany({
            orderBy:{
                createdAt: 'asc'
            }
        })

        const listings = showListings.map((listing) =>({
            ...listing, 
            createdat: listing.createdAt.toISOString(),
        }))
        return listings
   }catch(error: any){
        throw new Error(error)
   } 
}