import {userModel} from '../models/Users.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
class Users{
 async login(req,res){
     try {
         let body = req.body;
         var user = await userModel.findUser({email:body.email},{})
         if(!user){
             return res.status(400).send({
                 message:"Incorrect Email Provided"
             })
         }
         const isPasswordCorrect = await bcrypt.compare(body.password,user.password)
         if(!isPasswordCorrect){
           return res.status(400).send({
               message:"Password is incorrect"
           })
         }
         delete user.password
         var token = jwt.sign({ email: user.email, id: user._id }, 'thismysecret', { expiresIn: "1h" });
     } catch (error) {
         console.log("🚀 ~ file: Users.js ~ line 18 ~ Users ~ login ~ error", error)
         return res.status(503).send({
             message:"Service Unavailable",
         })
     }
     return res.status(200).send({
         message:"Login Successfully",
         data:user,
         token
     })
 }
 async signUp(req,res){
     try {
        var exisitingUser = await userModel.findUser({email:req.body.email},{'_id':1})
        if(exisitingUser){
            return res.status(400).send({
                message: "User already Exists."
            })
        }
        const hashedPassword = await bcrypt.hash(req.body.password,12)
        var user = await userModel._model.create({...req.body,password:hashedPassword})
        delete user._doc.password
        var token = jwt.sign({ email: user.email, id: user._id }, 'thismysecret', { expiresIn: "1h" });
    } catch (error) {
        return res.status(503).send({
            message:"Service Unavailable",
        })
     }
     return res.status(201).send({
        message:"Register Successfully",
        data:user,
        token
    })
 }
}
export let userController = new Users()