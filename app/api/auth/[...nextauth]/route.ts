import NextAuth,{NextAuthOptions} from "next-auth"
import GithubProvider from "next-auth/providers/github"
import {signIn} from "next-auth/react";
const authOptions : NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    // ...add more providers here
  ],
  secret : process.env.NEXTAUTH_SECRET,
  callbacks : {
    async signIn({profile}){
      
      return true
    }
  }
}
const handler = NextAuth(authOptions)
export {handler as GET, handler as POST}