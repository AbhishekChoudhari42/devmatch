import NextAuth,{NextAuthOptions} from "next-auth"
import GithubProvider from "next-auth/providers/github"
import {signIn} from "next-auth/react";
import { createOrUpdateUser } from "@/client_api/api";

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
    async signIn({profile}:any){
      // console.log(profile)
      // const {id,login,location,bio,email} = profile
      try{
        await createOrUpdateUser({
          user_id:  profile?.id as string,
          username: profile?.login as string,
          email:    profile?.email as string,
          location: profile?.location as string,
          bio:      profile?.bio as string
        })

        return true

      }catch(error){
        return false
      }
    }
  }
}

const handler = NextAuth(authOptions)
export {handler as GET, handler as POST}