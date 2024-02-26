// Importing User type from Prisma client
import {User, Reservation,Listing} from '@prisma/client';
// Defining the safeUser type by omitting certain fields from the User type
export type safeUser = Omit<
User,
"createdAt" | "updateAt" 
>& {
    // Adding modified fields with string types
    createdAt : string,
    updatedAt : string,
}

export type safeReservation = Omit<
User,
"createdAt" | "startDate" | "endDate" | "listing" 
>& {
    // Adding modified fields with string types
    createdAt : string,
    endDate : string,
    startDate : string,
    listing : safeListings,
}


export type safeListings = Omit<
Listing,
"createdAt" 
> & {
    // Adding modified fields with string types
    createdAt : string,
    
}