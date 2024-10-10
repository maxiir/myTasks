import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./lib/jwt";

export async function middleware(req: NextRequest) {
    const hasToken = req.cookies.get('Token')
    
    if(!hasToken){
        return NextResponse.redirect(new URL('/', req.url))
    }

    try {
        const verifiedToken = await verifyToken(hasToken.value)
    
        if(!verifiedToken){
            return NextResponse.redirect(new URL('/', req.url))
        }
                
        return NextResponse.next()
        
    } catch (error) {
        console.error('Error al verificar el token', error)
        return NextResponse.redirect(new URL('/', req.url))

    }
    
}

export const config = {
    matcher:['/tasks']
}