import jwt from 'jsonwebtoken'


type UserPayLoad={
    id:number
}

export const generateJWT=(data:UserPayLoad)=>{
    const token = jwt.sign(data,process.env.JWTSECRET,{
        expiresIn: '1d'
    })
    return token
}