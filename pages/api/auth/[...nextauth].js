import NextAuth from "next-auth"
import bcrypt from 'bcryptjs';
import CredentialsProvider from "next-auth/providers/credentials"

import db from "../../../lib/db"
import User from "../../../models/User"


export default NextAuth ({
        session:{
                strategy:"jwt"
        },
        callbacks:{
                async jwt( { token,     user }   ){
                        if (user?._id ){ token._id = user?._id } 
                        if (user?.isAdmin ){ token.isAdmin = user?.isAdmin } 
                        if (user?.isStaff ){ token.isStaff = user?.isStaff } 

                        return token
                },
                 
                 async session( { session , token } ){
                        if (token?._id ){ session._id = token?._id } 
                        if (token?.isAdmin ){ session.isAdmin = token?.isAdmin } 
                        if (token?.isStaff ){ session.isStaff = token?.isStaff } 

                        return token
                 }
        },
        providers:[
                CredentialsProvider({
                        async authorize(credentials ){
                                await db.connect();
                                const user = await User.findOne({email: credentials.email})
                                db.disconnect()

                                if (user && bcrypt.compareSync(credentials.password, user.password)){
                                        return {
                                                name: user.name  ,
                                                email: user.email ,
                                                password: user.password ,
                                                phone: user.phone ,
                                                isAdmin: user.isAdmin ,
                                                isStaff: user.isStaff ,
                                        }
                                }
                                throw new Error("Invalid email or password ")
                        }
                })
        ]
})