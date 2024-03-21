import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { AuthOptions } from "next-auth";
import prisma from "@/app/Library/prismdb";
import CredentialProviders from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

// Configuration options for NextAuth
export const authOption: AuthOptions = {
  // Using Prisma as the adapter for NextAuth
  adapter: PrismaAdapter(prisma),
  // Authentication providers
  providers: [
    // Credentials provider for custom email/password authentication
    CredentialProviders({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      // Authorization logic for validating credentials
      async authorize(credentials) {
        // Check if email and password are provided
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter correct credentials");
        }

        // Find the user in the database by email
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        // Check if user or hashedPassword is not available
        if (!user || !user?.hashedPassword) {
          throw new Error("Invalid Credentials");
        }

        // Compare the provided password with the hashed password in the database
        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        // If passwords do not match, throw an error
        if (!isCorrectPassword) {
          throw new Error("Invalid Credentials");
        }

        // Return the user object if authentication is successful
        return user;
      },
    }),
  ],
  // Custom pages configuration, redirects to "/" on signIn
  pages: {
    signIn: "/",
  },
  // Enable debug mode only during development
  debug: process.env.NODE_ENV === "development",
  // Session configuration using JSON Web Token (JWT) strategy
  session: {
    strategy: "jwt",
    maxAge: 1800
  },
  // Secret used for encrypting JWT tokens
  secret: process.env.NEXTAUTH_SECRET,
};

// Exporting NextAuth with the configured options
export default NextAuth(authOption);
