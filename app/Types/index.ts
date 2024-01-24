// Importing User type from Prisma client
import {User} from '@prisma/client';
// Defining the safeUser type by omitting certain fields from the User type
export type safeUser = Omit<
User,
"createdAt" | "updateAt" | "emailVerified"
>& {
    // Adding modified fields with string types
    createdAt : string,
    updatedAt : string,
    emailVerified : string | null,
}