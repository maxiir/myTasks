import {SignJWT, jwtVerify} from 'jose';

interface payloadToken{
    id_user: string,
    userName: string
}


const SECRET_KEY = new TextEncoder().encode(process.env.SECRET_KEY)

export const createToken = async ({id_user, userName}: payloadToken) => {
    try {
        const token = await new SignJWT({id_user, userName})
        .setProtectedHeader({alg:'HS256'})
        .setExpirationTime('1h')
        .sign(SECRET_KEY)
        return token
    } catch (error) {
        console.error('Error al generar el token', error)
        throw new Error('Error al generar el token')
    }
   
}

export const verifyToken = async (token: string) => {
    try {
        const verification = await jwtVerify(token, SECRET_KEY)
        return verification
    } catch (error) {
        console.error('Error al verificar el token')
        throw new Error ('Error al verifica el token')
    }   
}