import prisma from "@/app/Library/prismdb"

export default async function getListing() {
   try{
        const showListings = await prisma.listing.findMany({
            orderBy:{
                createdat: 'asc'
            }
        })

        return showListings
   }catch(error: any){
        throw new Error(error)
   } 
}