const initialValue = {
    registerDataObject: {
        isLoading: false,
        error: null,
        data: null
    },
    loginDataObject: {
        isLoading: false,
        error: null,
        data: null
    }
}
const authReducer = (state = initialValue, action) => {
    switch (action.type) {
        case 'PRE_REGISTER':
            return {
                ...state,
                registerDataObject: {
                    isLoading: true,
                    error: null,
                    data: null
                }
            }
        case 'REGISTER_SUCCESS':
            return {
                ...state,
                registerDataObject: {
                    isLoading: false,
                    error: null,
                    data: action.payload
                }
            }
        case 'REGISTER_FAILED':
            return {
                ...state,
                registerDataObject: {
                    isLoading: true,
                    error: action.payload,
                    data: null
                }
            }
        case 'CLEAR_REGISTER_ERROR':
            return {
                ...state,
                registerDataObject: {
                    isLoading: false,
                    error: null,
                    data: null
                }
            }
        case 'PRE_LOGIN':
            return {
                ...state,
                loginDataObject: {
                    isLoading: true,
                    error: null,
                    data: null
                }
            }
            case 'CLEAR_LOGIN_ERROR':
                return {
                    ...state,
                    loginDataObject: {
                        isLoading: false,
                        error: null,
                        data: null
                    }
                }    
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                loginDataObject: {
                    isLoading: false,
                    error: null,
                    data: action.payload
                }
            }
        case 'LOGIN_FAILED':
            return {
                ...state,
                loginDataObject: {
                    isLoading: false,
                    error: action.payload,
                    data: null
                }
            }

        default:
            return state
    }
}
export default authReducer