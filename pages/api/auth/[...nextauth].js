import NextAuth from "next-auth"
// import jwt from "jsonwebtoken"
import GoogleProvider from "next-auth/providers/google"
import InstagramProvider from "next-auth/providers/instagram"
import AppleProvider from "next-auth/providers/apple"
import CredentialsProvider from "next-auth/providers/credentials"
import connectMongo from "@/database/conn"
import Users from "@/models/Schema"
import { compare } from "bcryptjs"
// import { handleSignIn } from "@/utils/authCallbacks"

export const authOptions = {
  providers: [
    // Google Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // Instagram Provider
    InstagramProvider({
      clientId: process.env.INSTAGRAM_CLIENT_ID,
      clientSecret: process.env.INSTAGRAM_CLIENT_ID,
    }),
    AppleProvider({
      clientId: process.env.APPLE_ID,
      clientSecret: process.env.APPLE_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, req) {
        try {
          await connectMongo()
        } catch (error) {
          throw new Error("Connection error")
        }

        // check if user exists
        const result = await Users.findOne({ email: credentials.email })
        if (!result) {
          throw new Error("Sorry, there's been an error")
        }

        // compare password
        const checkPassword = await compare(
          credentials.password,
          result.password
        )

        // incorrect password
        if (!checkPassword || result.email !== credentials.email) {
          throw new Error("Username or password doesn't match")
        }

        return result
      },
    }),
  ],
  // callbacks: {
  //   async signIn(user, account, profile) {
  //     return handleSignIn(user, account, profile, account.provider)
  //   },
  //   // async jwt(token, user) {
  //   //   // Modify JWT token if needed
  //   //   if (user) {
  //   //     token.id = user.id
  //   //     // Other modifications
  //   //   }
  //   //   return token
  //   // },
  //   async jwt(token, user) {
  //     if (user) {
  //       const { id, email } = user // Extract user information
  //       const secretKey = process.env.JWT_SECRET_KEY // Replace with your secret key

  //       // Create a JWT token with user information
  //       const jwtToken = jwt.sign({ id, email }, secretKey, {
  //         expiresIn: "1d", // Token expiration time (adjust as needed)
  //       })

  //       token.id = id
  //       token.email = email
  //       token.accessToken = jwtToken // Store the generated JWT token in the token object

  //       // Other modifications to the token if needed
  //     }

  //     return token
  //   },
  // },
  callbacks: {
    async session(session, user) {
      session.provider = user.provider // Store provider information in the session
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}

// This configuration is from the NextAuth docs:
// https://next-auth.js.org/getting-started/example
export default NextAuth(authOptions)
