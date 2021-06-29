import {utils} from "../../utils"
class PostAction{
 addPost(obj,token,history,callback){
     return async(dispatch)=>{
        const params = {
            url:'http://localhost:5000/api/post/add-post',
            defaultAction:'PRE_ADDPOST',
            successAction:'ADDPOST_SUCCESS',
            failAction:'ADDPOST_FAILED',
            type:'POST',
            token,
            dispatch,
            history,
            params:obj,
            noToken:false,
            callback
         }
        await utils.makeAPICall(params)
     }
 }
 getPost(token,history,callback){
    return async(dispatch)=>{
       const params = {
           url:'http://localhost:5000/api/post/list',
           defaultAction:'PRE_GETPOST',
           successAction:'GETPOST_SUCCESS',
           failAction:'GETPOST_FAILED',
           type:'GET',
           token,
           history,
           dispatch,
           noToken:false,
           callback
        }
         await utils.makeAPICall(params)
    }
}
likePost(token,obj,history,callback){
    return async(dispatch)=>{
        const params = {
            url:`http://localhost:5000/api/post/like?id=${obj._id}`,
            defaultAction:'PRE_LIKEPOST',
            successAction:'LIKEPOST_SUCCESS',
            failAction:'LIKEPOST_FAILED',
            type:'GET',
            token,
            history,
            payload:obj,
            dispatch,
            noToken:false,
            callback
         }
          await utils.makeAPICall(params)
    }
}
}
export let postAction = new PostAction()