
import NextAuth from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { PrismaClient } from "@prisma/client" 
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();

export const authOptions={

  session:{
    strategy:"jwt",
  },
  
  adapter:PrismaAdapter(PrismaClient),
  pages: {
    signIn: "/auth/login",
  },
  providers: [
    CredentialsProvider({

      name: "Credentials",
     
      authorize: async (credentials,req) => {
        
        const user = await prisma.user.findUnique({
          where: {
               correo: credentials.identifier 
          },
        });

        if (user && bcrypt.compareSync(credentials.password, user.password)) {
          
          return Promise.resolve(user);
          
        } else {
          
          return Promise.resolve(null);
        }
      },
    }),
  ],
  
  callbacks:{
    jwt(params){
      //update token
      if(params.user?.role){
        params.token.role =params.user.role;
      }
      // return final token
      return params.token;
    }
  }

}

export default NextAuth(authOptions)
