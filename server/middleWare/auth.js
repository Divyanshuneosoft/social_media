import jwt from 'jsonwebtoken'
import { userModel } from '../models/Users.js'
class Auth {
    async validator(req, res, next) {
        try {
            let decoded
            const token = req.headers.token
            if (!token) {
                return res.status(403).send({
                    message: 'User Identifier not found'
                })
            }
             decoded = await new Promise((resolve, reject) => {
                jwt.verify(token, 'thismysecret', (error, result) => {
                   if(error){
                       reject({
                           code:401,
                           message:'Token Expired'
                       })
                   }
                   resolve(result)
                })
            })
            if (!decoded) {
                return res.status(403).send({
                    message: 'Token Expired'
                })
            }
            const user = await userModel.findUser({ '_id': decoded.id }, { 'password': 0 })
            if (!user) {
                return res.status(403).send({
                    message: 'Token Expired'
                })
            }
            req.user = user
        } catch (error) {
            if(error.code) return res.status(error.code).send({
                message:error.message
            })
            return res.status(503).send({
                message: 'Service unavailable'
            })
        }
        next()
    }
}
export let auth = new Auth()