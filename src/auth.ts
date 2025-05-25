import { JSON_HEADER, SESSION_TOKEN } from "./lib/constants/api.constanst";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import TwitterProvider from "next-auth/providers/twitter";
import { cookies } from "next/headers";

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
        token.user = user.user; // Ensure user object includes token
        token.token = user.token; // Store access token separately
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user; // Attach user data to session
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
        if (!credentials || !credentials?.email || !credentials?.password) {
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
            const errorData = await response.json();
            console.error("API Error Response:", errorData);
            throw new Error(errorData.message || "Failed to authenticate");
          }

          const data = await response.json();

          if (!data) {
            throw new Error("Empty response from server");
          }
          console.log("data.token  data.token  data.token  data.token  data.token data.token", data);
          // Rest of your code remains the same
          cookies().set(SESSION_TOKEN, data.token, {
            httpOnly: true,
          });

          return data; // Return the user object from the API response
        } catch (error) {
          console.error("Authentication error:", error);
          throw new Error(error instanceof Error ? error.message : "Failed to authenticate");
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
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
