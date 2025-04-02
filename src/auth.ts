import { JSON_HEADER } from "./lib/constants/api.constanst";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import TwitterProvider from "next-auth/providers/twitter";
import { cookies } from "next/headers";
import { SESSION_TOKEN } from "@/src/lib/constants/api.constanst";

export const OPTIONS: NextAuthOptions = {
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user; // Ensure user object includes token
        token.token = (user as User).token; // Store access token separately using type assertion
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as User; // Attach user data to session
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error("No credentials provided");
        }

        try {
          const response = await fetch("https://exam.elevateegy.com/api/v1/auth/signin", {
            method: "POST",
            headers: { ...JSON_HEADER },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          // Check if response is ok before trying to parse JSON
          if (!response.ok) {
            const errorData = await response.text();
            console.error("API Error Response:", errorData);
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();

          if (!data) {
            throw new Error("Empty response from server");
          }

          // Rest of your code remains the same
          cookies().set(SESSION_TOKEN, data.token, {
            httpOnly: true,
          });

          return {
            id: data.user._id,
            name: `${data.user.firstName} ${data.user.lastName}`,
            email: data.user.email,
            image: null,
            message: data.message,
            token: data.token,
            username: data.user.username,
            firstName: data.user.firstName,
            lastName: data.user.lastName,
            phone: data.user.phone,
            role: data.user.role,
            isVerified: data.user.isVerified,
            passwordChangedAt: data.user.passwordChangedAt,
          };
        } catch (error) {
          console.error("Authentication error:", error);
          throw new Error(error instanceof Error ? error.message : "Failed to authenticate");
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID as string,
      clientSecret: process.env.TWITTER_CLIENT_SECRET as string,
      version: "2.0",
    }),
  ],
};
