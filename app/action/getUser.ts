"useclient"

import { getServerSession } from "next-auth/next";
import { authOption } from "@/pages/api/auth/[...nextauth]";
import React from 'react'
import prisma from "@/app/Library/prismdb";

export async function getSession(){
    return await getServerSession(authOption);
}

export default async function getCurrentUser() {
    try{
        const session = await getSession();

        if(!session?.user?.email){
            return null;  
        }

        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user.email //as string
            }
        });

        if(!currentUser){
            return null
        }
        return currentUser;
    }
    catch(error: any){
        return null;
    }
    
}