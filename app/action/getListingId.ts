
import prisma from "@/app/Library/prismdb";

interface Params {
  id?: string;
}

export default async function getListingId(params: Params) {
  try {
    const { id } = params;

    const listing = await prisma.listing.findUnique({
      where: {
        id: id, // Provide the ID here
      },
      include: {
        user: true,
      },
    });

    if (!listing) {
      return null
    }

    return {
      ...listing,
      createdAt: listing.createdAt.toISOString(),
      user: {
        ...listing.user,
        createdAt: listing.user.createdAt.toISOString(),
        updatedAt: listing.user.updatedAt.toISOString(),
      },
    };
  } catch (error: any) {
    throw new Error(error);
  }
}
