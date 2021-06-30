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
    },
    detailPostObject:{
        isLoading:false,
        error:null,
        data:null
    },
    editPostObject:{
        isLoading:false,
        error:null,
        data:null
    },
    deletePostObject:{
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
                    case 'PRE_DETAILPOST':
                        return {
                            ...state,
                            detailPostObject: {
                                isLoading: true,
                                error: null,
                                data: null
                            }
                        }
                    case 'DETAILPOST_SUCCESS':
                        return {
                            ...state,
                            detailPostObject: {
                                isLoading: false,
                                error: null,
                                data: action.payload
                            }
                        }
                    case 'DETAILPOST_FAILED':
                        return {
                            ...state,
                            detailPostObject: {
                                isLoading: true,
                                error: action.payload,
                                data: null
                            }
                        }
                    case 'CLEAR_DETAILPOST_ERROR':
                        return {
                            ...state,
                            detailPostObject: {
                                isLoading: false,
                                error: null,
                                data: null
                            }
                        }
                        case 'PRE_EDITPOST':
                            return {
                                ...state,
                                editPostObject: {
                                    isLoading: true,
                                    error: null,
                                    data: null
                                }
                            }
                        case 'EDITPOST_SUCCESS':
                            return {
                                ...state,
                                editPostObject: {
                                    isLoading: false,
                                    error: null,
                                    data: action.payload
                                }
                            }
                        case 'EDITPOST_FAILED':
                            return {
                                ...state,
                                editPostObject: {
                                    isLoading: true,
                                    error: action.payload,
                                    data: null
                                }
                            }
                        case 'CLEAR_EDITPOST_ERROR':
                            return {
                                ...state,
                                editPostObject: {
                                    isLoading: false,
                                    error: null,
                                    data: null
                                }
                            } 
                            case 'PRE_DELETEPOST':
                                return {
                                    ...state,
                                    deletePostObject: {
                                        isLoading: true,
                                        error: null,
                                        data: null
                                    }
                                }
                            case 'DELETEPOST_SUCCESS':
                                return {
                                    ...state,
                                    deletePostObject: {
                                        isLoading: false,
                                        error: null,
                                        data: action.payload
                                    }
                                }
                            case 'DELETEPOST_FAILED':
                                return {
                                    ...state,
                                    deletePostObject: {
                                        isLoading: true,
                                        error: action.payload,
                                        data: null
                                    }
                                }
                            case 'CLEAR_DELETEPOST_ERROR':
                                return {
                                    ...state,
                                    deletePostObject: {
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