import {withAuth} from 'next-auth/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt'

export default withAuth(
    async function middleware(req:NextRequest){
        //return NextResponse
        const session: any = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
        console.log('role',session.role)
        const requestedPage = req.nextUrl.pathname;
        const validRoles = ['SUPERADMIN', 'ADMIN'];
        
        if( !session ){
            const url = req.nextUrl.clone();
     
            url.pathname = `/auth/login`;
            url.search = `p=${ requestedPage }`;
            
            if( requestedPage.includes('/api') ){
              return new Response( JSON.stringify({ message: 'No autorizado' }),{
                status: 401,
                headers:{
                  'Content-Type':'application/json'
                }
              });
            };
     
            return NextResponse.redirect( url );
        };
     
        if( requestedPage.includes('/api/admin') && !validRoles.includes( session.role ) ){
     
          return new Response( JSON.stringify({ message: 'No autorizado' }),{
            status: 401,
            headers:{
              'Content-Type':'application/json'
            }
            });
        };
     
        if( requestedPage.includes('/admin') && !validRoles.includes( session.role ) ){
     
          return NextResponse.redirect(new URL('/', req.url));
        };
     
        return NextResponse.next();

    },
    {
        callbacks:{
            authorized({token}){
                console.log('aqui',token)
                return token?.role === "SUPERADMIN";
            },
        },
    }
);

export const config ={matcher:['/admin']}