import passport from "passport"
import { Strategy as JwtStrategy } from "passport-jwt"
import { JWT_PRIVATE_KEY } from "../config/config.js"

passport.use('jwt', new JwtStrategy(
    {
        jwtFromRequest:function(req){
            var token= null
            if(req && req['signedCookies'] && req['signedCookies']['auth']){
                token = req['signedCookies']['auth']
                //console.log(req['signedCookies']['auth'])
            }
            return token
        },
        secretOrKey: JWT_PRIVATE_KEY
    },
    (user,done)=>{
        done(null,user)
    }
))

export const authentication = passport.initialize()