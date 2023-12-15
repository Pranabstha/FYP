import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { AuthOptions } from "next-auth";
import prisma from "@/app/Library/prismdb";
import GoogleProvider from "next-auth/providers/google";
import CredentialProviders from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOption: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    //Log In with Google using google Providers
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialProviders({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Plese enter correct Credential ");
        }
        //Cheaking the email and passoword
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
      if (!user || !user?.hashedPassword) {
          throw new Error("Invalid Credentials");
        }
        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isCorrectPassword) {
          throw new Error("Invalid Credintials");
        }

        return user;
      },
    }),
  ],
  // redirectrs to /page
  pages: {
    signIn: "/",
  },
  //only enable debug during development
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOption);
