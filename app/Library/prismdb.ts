import { PrismaClient } from '@prisma/client'

//globally defined prisma which can be used in our project
declare global {
    var prisma : PrismaClient | undefined
}

// created a constant which seraches for global prisma or creates a new prisma client
const client = globalThis.prisma || new PrismaClient()
//checks if the prisma is not production and else creates a new prisma client 
//can create multiple clients which casuse uncessary errors
if(process.env.NODE_ENV !== 'production') globalThis.prisma = client

export default client;