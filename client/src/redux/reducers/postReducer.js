const initialValue = {
    addPostObject:{
        isLoading:false,
        error:null,
        data:null
    },
    getPostObject:{
        isLoading:false,
        error:null,
        data:null
    }
}

 const postReducer = (state=initialValue,action)=>{
     switch(action.type){
        case 'PRE_POST':
            return {
                ...state,
                addPostObject: {
                    isLoading: true,
                    error: null,
                    data: null
                }
            }
        case 'ADDPOST_SUCCESS':
            return {
                ...state,
                addPostObject: {
                    isLoading: false,
                    error: null,
                    data: action.payload
                }
            }
        case 'ADDPOST_FAILED':
            return {
                ...state,
                addPostObject: {
                    isLoading: true,
                    error: action.payload,
                    data: null
                }
            }
        case 'CLEAR_ADDPOST_ERROR':
            return {
                ...state,
                addPostObject: {
                    isLoading: false,
                    error: null,
                    data: null
                }
            }
            case 'PRE_GETPOST':
                return {
                    ...state,
                    getPostObject: {
                        isLoading: true,
                        error: null,
                        data: null
                    }
                }
            case 'GETPOST_SUCCESS':
                return {
                    ...state,
                    getPostObject: {
                        isLoading: false,
                        error: null,
                        data: action.payload
                    }
                }
            case 'GETPOST_FAILED':
                return {
                    ...state,
                    getPostObject: {
                        isLoading: true,
                        error: action.payload,
                        data: null
                    }
                }
            case 'CLEAR_GETPOST_ERROR':
                return {
                    ...state,
                    getPostObject: {
                        isLoading: false,
                        error: null,
                        data: null
                    }
                }  
                case 'PRE_LIKEPOST':
                    return {
                        ...state,
                        getPostObject: {
                            ...state.getPostObject,
                            isLoading: true
                        }
                    }   
                case 'LIKEPOST_SUCCESS':
                    let data = state.getPostObject.data
                    let index = data.data[action.payload.index]?.likes.indexOf(action.payload.userId)
                    index === -1 ? data.data[action.payload.index]?.likes.push(action.payload.userId):data.data[action.payload.index].likes = data.data[action.payload.index].likes.filter(id=> id !== action.payload.userId) 
                    return {
                        ...state,
                        getPostObject: {
                            isLoading: false,
                            error: null,
                            data: data
                        }
                    }
                case 'LIKEPOST_FAILED':
                    return {
                        ...state,
                        getPostObject: {
                            isLoading: true,
                            error: action.payload,
                            data: null
                        }
                    }
                case 'CLEAR_LIKEPOST_ERROR':
                    return {
                        ...state,
                        getPostObject: {
                            isLoading: false,
                            error: null,
                            data: null
                        }
                    }    
            default:
                return state      
     }

}
export default postReducer