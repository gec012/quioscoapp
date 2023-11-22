
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
          await prisma.$disconnect()
          return Promise.resolve(user);
          
        } else {
          await prisma.$disconnect()
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
        const expiresInMinutes = 3; // 3 minutos
        params.token.exp =Math.floor(Date.now() / 1000) + 60 * expiresInMinutes; // El token expirará en 3 minutos
      }
      // return final token
      return params.token;
    }
  }

}

export default NextAuth(authOptions)
