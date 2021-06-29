import {utils} from "../../utils"

class AuthAction{
  signIn(obj,callback){
      return async(dispatch)=>{
          const params = {
             url:'http://localhost:5000/api/user/login',
             defaultAction:'PRE_LOGIN',
             successAction:'LOGIN_SUCCESS',
             failAction:'LOGIN_FAILED',
             type:'POST',
             dispatch,
             params:obj,
             noToken:true,
             callback

          }
           await utils.makeAPICall(params)
      }
  }
  signUp(obj,callback){
      return async(dispatch)=>{
          const params = {
            url:'http://localhost:5000/api/user/signup',
            defaultAction:'PRE_REGISTER',
            successAction:'REGISTER_SUCCESS',
            failAction:'REGISTER_FAILED',
            type:'POST',
            dispatch,
            params:obj,
            noToken:true,
            callback

         }
          await utils.makeAPICall(params)
      }
  }
}
export let authAction =  new AuthAction()