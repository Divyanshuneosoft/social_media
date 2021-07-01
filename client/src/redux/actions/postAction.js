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
detailPost(token,obj,history,callback){
    return async(dispatch)=>{
        const params = {
            url:`http://localhost:5000/api/post/detail?id=${obj._id}`,
            defaultAction:'PRE_DETAILPOST',
            successAction:'DETAILPOST_SUCCESS',
            failAction:'DETAILPOST_FAILED',
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
editPost(obj,token,history,callback){
    return async(dispatch)=>{
        const params = {
            url:`http://localhost:5000/api/post/edit-post`,
            defaultAction:'PRE_EDITPOST',
            successAction:'EDITPOST_SUCCESS',
            failAction:'EDITPOST_FAILED',
            type:'POST',
            token,
            params:obj,
            history,
            dispatch,
            noToken:false,
            callback
         }
          await utils.makeAPICall(params)
    }
}
deletePost(token,obj,history,callback){
    return async(dispatch)=>{
        const params = {
            url:`http://localhost:5000/api/post/delete?id=${obj._id}`,
            defaultAction:'PRE_DELETEPOST',
            successAction:'DELETEPOST_SUCCESS',
            failAction:'DELETEPOST_FAILED',
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
getPostBySearch(token,obj,history,callback){
    return async(dispatch)=>{
       const params = {
           url:`http://localhost:5000/api/post/search?name=${obj.name}`,
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
}
export let postAction = new PostAction()